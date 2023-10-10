import styles from './styles.module.css';


import { FaAngleDoubleDown, FaAngleDoubleUp, FaArrowAltCircleDown, FaLongArrowAltRight } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';


import { useState } from 'react';
export const MeetingForm = ({ meeting, onSubmit, rescheduling = false }) => {
    const [comment, setComment] = useState(meeting && meeting.comment || "");
    const [link, setLink] = useState(meeting && meeting.link || "");
    const [location, setLocation] = useState(meeting && meeting.location || "");
    const [toggle, setToggle] = useState(false);
    const _startDate = meeting && meeting.startDate.split("T")[0] || "";
    const _startTime = meeting && meeting.startDate.split("T")[1].split(":").slice(0, 2).join(":") || "";
    const _endDate = meeting && meeting.endDate.split("T")[0] || "";
    const _endTime = meeting && meeting.endDate.split("T")[1].split(":").slice(0, 2).join(":") || "";
    return (
        <div className={styles.meetingFormContainer} onSubmit={onSubmit}>
            {rescheduling && <p className={styles.title}>{`Reschedule ${meeting.module} lesson`}</p> || <h1>New Lesson</h1>}
            <form onSubmit={onSubmit} className={styles.meetingForm}>
                <div className={styles.date}>
                    <div>
                        <input defaultValue={_startDate} type="date" name="start" required />
                        <input defaultValue={_startTime} type="time" name="startTime" required />
                    </div>
                    <FaLongArrowAltRight size={32} color={"white"} />
                    <div>
                        <input defaultValue={_endDate} type="date" name="end" required />
                        <input defaultValue={_endTime} type="time" name="endTime" required />
                    </div>
                </div>
                {
                    rescheduling && localStorage.getItem("userType") == "T" && toggle &&
                    <div className={styles.tutorDataContainer}>
                        <div className={styles.target} >
                            <span className={styles.left}>location</span> 
                            <input defaultValue={meeting.location} className={styles.locationInput} name="location" type="text" onChange={(e) => setLocation(e.target.value)} required/>
                            {location === "online" &&
                                <>
                                    <span className={styles.left}>link</span>
                                    <input defaultValue={meeting.link} type='text' name="link" onChange={e => setLink(e.target.value)} required />
                                </>}
                        </div>
                        <div className={styles.commentHeader}>
                            <span className={styles.splitter}></span>
                            <span className={styles.commentTitle}>Comment</span>
                            <span className={styles.splitter}></span>
                        </div>
                        <textarea defaultValue={meeting.comment} className={styles.comment} name="comment" onChange={e => setComment(e.target.value)} />
                        <div className={styles.splitter} />
                    </div>}
                {(!rescheduling || toggle) && 
                <button type="submit">
                    <ImCheckmark size={32} />
                </button>}
                {rescheduling && <div className={styles.dropdown} onClick={e => setToggle(!toggle)}>{toggle? <FaAngleDoubleUp/> : <FaAngleDoubleDown/>}</div>}
            </form>
        </div>
    )
}