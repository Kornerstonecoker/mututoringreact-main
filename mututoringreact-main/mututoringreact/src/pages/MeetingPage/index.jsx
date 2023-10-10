import styles from "./styles.module.css"
import { MeetingForm } from "../../components/Timetable/MeetingForm"

import { useParams } from "react-router-dom"
import { MergedTable } from "../../components/MergedTable"
import { postMeeting } from "../../endpoints"
import { useState } from "react"
import { Error } from "../../components/Error"
import { Checkmark } from "../../components/checkmark"
import { AnimatedMessage } from "../../components/AnimatedMessage"
import NavBar from "../../components/Navbar"

export const MeetingPage = () => {
    const { id, code } = useParams();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    return !success && <>
    <NavBar/>
        <div className={styles.newMeetingContainer}>
            <MeetingForm onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                postMeeting({
                    tutorId: id,
                    studentId: localStorage.getItem("userId"),
                    module: code,
                    startDate: e.target.start.value + "T" + e.target.startTime.value + ":00",
                    endDate: e.target.end.value + "T" + e.target.endTime.value + ":00"
                }).then(() => {
                    setSuccess(<div className={styles.msgContainer}><AnimatedMessage 
                        message="We're notifying the tutor right away!"
                        redirect={() => window.location.href = (localStorage.getItem("userType") == "S" ? "/students/" : "/tutors/") + localStorage.getItem("userId")}
                        animation={<Checkmark/>}
                    /></div>)
                }).catch(error => {
                    setError(<Error status={error.response.status} message={error.response.data} />)
                })
            }} />
            {error}
            <MergedTable studentId={localStorage.getItem("userId")} tutorId={id}/>
        </div>
    </> || <>{success} </>
}