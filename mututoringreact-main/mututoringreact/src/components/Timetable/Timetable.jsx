import { getTimetableForStudent, getTimetableForTutor } from "../../endpoints"
import { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"
import { BusyPopup } from "./BusyPopup/BusyPopup"
import { Header } from "./Header"
import {dateFromIso, thisMonday, nextMonday, previousMonday } from "./DateHelpers"
import { BusySlots } from "./BusySlots"
import { Meetings } from "./Meetings"
import { Popup } from "../Popup"
import { SearchUI } from "../SearchUI"

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const Timetable = ({ userType, id, code }) => {

    //state
    const [timetable, setTimetable] = useState(null)
    const [from, setFrom] = useState(dateFromIso(thisMonday()))
    const [to, setTo] = useState(dateFromIso(nextMonday(from)))
    const [error, setError] = useState(null)
    const [busy, setBusy] = useState([])
    const [meetings, setMeetings] = useState([])
    const [popup, setPopup] = useState(null)

    //refs
    const scrollableRef = useRef(null)
    const offsetY = useRef(null)
    const offsetX = useRef(null)
    const x = useRef(null)
    const y = useRef(null)

    const fetchTimetable = () => {

        const handleResponse = ({ data }) => {
            console.log(JSON.stringify(data))
            setTimetable(data)
            setBusy(<BusySlots 
                pointers={{x, y, offsetY, offsetX}}
                edge={scrollableRef} 
                userType={userType} 
                onClick={fetchTimetable}
                editable={id === localStorage.getItem("userId")}
                data={data.busy} 
                onError={(err) => setError(err)}
            />)
            setMeetings(<Meetings 
                onChange={fetchTimetable}
                type={userType}
                targetId={id}
                pointers={{offsetX, offsetY, x, y}} 
                edge={scrollableRef} 
                data={data.meetings} 
                show={id === localStorage.getItem("userId")}
                onError={(err) => setError(err)}
            />)
        }

        if (userType === 'S') {
            getTimetableForStudent(id, from, to).then((response) => {
                handleResponse(response)
            })
        } else if (userType === 'T') {
            getTimetableForTutor(id, from, to).then((response) => {
                handleResponse(response)
            })
        }
    }

    useEffect(() => {
        //scrollableRef.current && (scrollableRef.current.scrollTop = 924)
        fetchTimetable()
        console.log("fetching")
    }, [from])

    const resize = () => {
        const handleResize = () => {
            setBusy(<BusySlots 
                pointers={{x, y, offsetY, offsetX}}
                edge={scrollableRef} 
                userType={userType} 
                data={timetable.busy} 
                editable={id === localStorage.getItem("userId")}
                onError={(err) => setError(err)}
            />)
            setMeetings(<Meetings 
                type={userType}
                pointers={{offsetX, offsetY, x, y}}
                edge={scrollableRef} 
                targetId={id}
                data={timetable.meetings} 
                show={id === localStorage.getItem("userId")}
                onError={(err) => setError(err)}
            />)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }

    useEffect(() => {
        return resize();
    }, [busy, meetings])

    const nextWeek = () => {
        setFrom(dateFromIso(nextMonday(from)))
        setTo(dateFromIso(nextMonday(nextMonday(from))))
    }

    const prevWeek = () => {
        setTo(from)
        setFrom(dateFromIso(previousMonday(from)))
    }

    const thisWeek = () => {
        let thisMon = dateFromIso(thisMonday())
        setFrom(thisMon)
        setTo(dateFromIso(nextMonday(thisMon)))
    }

    useEffect(() => {
        fetchTimetable()
    }, [])

    const addBusy = () => {
        setPopup(<Popup content={<BusyPopup type={userType} hide={() => { setPopup(null); fetchTimetable() }} />} whenClosed={() => setPopup(null)}/>)
    }
    
    const getFormattedDay = (date, offset) => {
        date = new Date(date)
        offset && date.setDate(date.getDate() + offset)
        date = date.toDateString().split(' ');
        let day = Number.parseInt(date[2])
        return (day % 10 === 1 ? `${day}st` : day % 10 === 2 ? `${day}nd` : day % 10 === 3 ? `${day}rd` : `${day}th`) + " " + date[1]
    }

    const addMeeting = () => {
        if(!code)
            setPopup(<Popup 
                content={
                <div className={styles.searchContainer}>
                    <SearchUI 
                        depth={1} 
                        onResult={code => window.location.href = "/new/" + id + "/" + code}
                    />
                </div>}
                whenClosed={() => setPopup(null)}
            />)
        else
            window.location.href = "/new/" + id + "/" + code;
    }

    const timeAdd = (time, minsToAdd) => {
        function D(J) { return (J < 10 ? '0' : '') + J }
        let piece = time.split(':')
        let mins = Number.parseInt((piece[0] * 60)) + Number.parseInt(piece[1]) + Number.parseInt(minsToAdd)
        return D(mins / 60 | 0) + ':' + D(mins % 60);
    }
    return timetable && <div className={styles.timetable}>
        <Header
            date={from}
            editable={userType === localStorage.getItem("userType")
                && id === localStorage.getItem("userId")}
            onNewBusy={addBusy}
            onNewMeeting={addMeeting}
            onPrevWeek={prevWeek}
            onNextWeek={nextWeek}
            onThisWeek={thisWeek}
        />
        <div className={styles.scrollable} ref={scrollableRef}>
            <div ref={offsetY} className={styles.header}>{
                [<span className={styles.time} key={0}>Time</span>].concat(DAYS.map((day, i) =>
                    <span ref={x} className={styles.dateContainer} key={i + 1}>
                        <p className={styles.day}>{day}</p>
                        <p className={styles.date}>{getFormattedDay(from, i)}</p>
                    </span>))
            }</div>
            <div ref={offsetX} className={styles.tableLeft}>
                {Array.from(Array(24).keys()).map(i => <span key={i} ref={y} className={styles.timeCell}>
                    {timeAdd('07:00', i * 30)}
                </span>)}
            </div>
            {busy}
            {meetings}
        </div>
        {popup}
        {error}
    </div>
}  