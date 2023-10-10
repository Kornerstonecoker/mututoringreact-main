import { getMergedTimetable } from "../../endpoints"
import { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"
import { BusyPopup } from "../Timetable/BusyPopup/BusyPopup"
import { Header } from "../Timetable/Header"
import {dateFromIso, thisMonday, nextMonday, previousMonday } from "../Timetable/DateHelpers"
import { BusySlots } from "../Timetable/BusySlots"
import { Meetings } from "../Timetable/Meetings"
import { Popup } from "../Popup"
import { Loader } from "../Loader"

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const MergedTable = ({ studentId, tutorId }) =>  {

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
        getMergedTimetable(studentId, tutorId, from, to).then(({ data }) => {
            setTimetable(data)
            // alert(JSON.stringify(data.meetings))
            setBusy(<BusySlots 
                pointers={{x, y, offsetY, offsetX}}
                edge={scrollableRef} 
                data={data.busy} 
                onError={(err) => setError(err)}
            />)
            setMeetings(<Meetings 
                pointers={{offsetX, offsetY, x, y}} 
                edge={scrollableRef} 
                data={data.meetings} 
                show={false}
                onError={(err) => setError(err)}
            />)
        })
    }

    useEffect(() => {
        fetchTimetable()
    }, [from])

    const resize = () => {
        const handleResize = () => {
            setBusy(<BusySlots 
                pointers={{x, y, offsetY, offsetX}}
                edge={scrollableRef} 
                data={timetable.busy}
                onError={(err) => setError(err)}
            />)
            setMeetings(<Meetings 
                pointers={{offsetX, offsetY, x, y}}
                edge={scrollableRef} 
                data={timetable.meetings} 
                show={false}
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
    
    const getFormattedDay = (date, offset) => {
        date = new Date(date)
        offset && date.setDate(date.getDate() + offset)
        date = date.toDateString().split(' ');
        let day = Number.parseInt(date[2])
        return (day % 10 === 1 ? `${day}st` : day % 10 === 2 ? `${day}nd` : day % 10 === 3 ? `${day}rd` : `${day}th`) + " " + date[1]
    }

    const timeAdd = (time, minsToAdd) => {
        function D(J) { return (J < 10 ? '0' : '') + J }
        let piece = time.split(':')
        let mins = Number.parseInt((piece[0] * 60)) + Number.parseInt(piece[1]) + Number.parseInt(minsToAdd)
        return D(mins / 60 | 0) + ':' + D(mins % 60);
    }

    useEffect(() => {
        fetchTimetable()
    }, [])
    return timetable && <div className={styles.timetable}>
        <Header
            date={from}
            forMerged={true}
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
    </div> || <Loader/>
}