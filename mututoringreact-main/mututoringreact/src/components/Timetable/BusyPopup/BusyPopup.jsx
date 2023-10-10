import {useState } from "react";
import { updateTimetableForStudent, updateTimetableForTutor } from "../../../endpoints";
import { Error } from "../../Error";
import styles from "./styles.module.css";

const BusyPopup = ({ type, hide }) => {
    const [start , setStart] = useState("");
    const [end , setEnd] = useState("");
    const [day , setDay] = useState("monday");
    const [error, setError] = useState(null);
    const submit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (type === 'S') {
            updateTimetableForStudent({studentId: localStorage.getItem("userId"), busy:{[day]: [{start: start, end: end}] }}).then((response) => {
                hide();
            }).catch((error) => {
                setError(<Error status={error.status} message={error.response.data.message}/>)
            });
        }
        else if (type === 'T') {
            updateTimetableForTutor({tutorId: localStorage.getItem("userId"), busy: {[day]: [{start: start, end: end}]} }).then((response) => {
                hide();
            }).catch((error) => {
                setError(<Error status={error.status} message={error.response.data.message}/>)
            });
        }
    }
    return (
    <div className={styles.BusyPopup} onClick={e => e.stopPropagation()}>
        <h1>When are you unavailable?</h1>
        <form onSubmit={ submit }>
            <span>Day</span>
            <select 
            id="days" 
            name="day"
            required
            onChange={e => setDay(e.target.value)}
            >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
            <span>Start</span>
            <input
                type="time"
                name="start"
                onChange={e => setStart(e.target.value + ":00")}
            />
            <span>End</span>
            <input
                type="time"
                name="end"
                onChange={e => setEnd(e.target.value + ":00")}
            />
            <input 
                type="submit"
                value="Submit"
            />
        </form>
        {error}
    </div>
    );
}

export { BusyPopup };