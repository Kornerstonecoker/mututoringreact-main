import styles from "./styles.module.css"
import { useParams } from "react-router-dom"
import { MergedTable } from "../../components/MergedTable"
import { getMeeting, rescheduleAsStudent, rescheduleAsTutor } from "../../endpoints"
import { useState } from "react"
import { Error } from "../../components/Error"
import { MeetingForm } from "../../components/Timetable/MeetingForm"
import { useEffect } from "react"
import { Loader } from "../../components/Loader"
import { Checkmark } from "../../components/checkmark"
import { AnimatedMessage } from "../../components/AnimatedMessage"
import NavBar from "../../components/Navbar"

export const ReschedulePage = () => {
    const { id } = useParams();
    const [meeting, setMeeting] = useState(null)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        getMeeting(id).then(response => {
            setMeeting(response.data)
        }).catch(error => {
            setError(<Error status={error.response.status} message={error.response.data.message} />)
        })
    }, [])

    const reschedule = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isStudent = localStorage.getItem("userType") == "S" 
        let formData ={
            id: id,
            startDate: e.target.start.value + "T" + e.target.startTime.value + ":00",
            endDate: e.target.end.value + "T" + e.target.endTime.value + ":00",
        }
        if(!isStudent) {
            formData.location = e.target.location.value
            e.target.link && (formData.link = e.target.link.value)
            formData.comment = e.target.comment.value
        }
    
        (isStudent ? rescheduleAsStudent : rescheduleAsTutor)(formData).then(() => {
            setSuccess(<div className={styles.msgContainer}><AnimatedMessage 
                message="Rescheduled!"
                redirect={() => window.location.href = (localStorage.getItem("userType") == "S" ? "/students/" : "/tutors/") + localStorage.getItem("userId")}
                animation={<Checkmark/>}
            />
            </div>)
        }).catch(error => {
            setError(<Error message={error.response.data}/>)
        })
    }

    return !success && (meeting && <>
        <NavBar/>
        <div className={styles.rescheduleContainer}>
            <MeetingForm 
                meeting={meeting} 
                onSubmit={reschedule} 
                rescheduling={true} 
            />
            {error}
            <MergedTable
                studentId={meeting.studentId} 
                tutorId={meeting.tutorId}
            />
        </div>
    </> || <Loader/>) || <> {success} </>
}
