import styles from './styles.module.css';
import { getPendingMeetingsByStudent, getStudent } from "../../endpoints"
import { Timetable } from "../../components/Timetable/Timetable"
import { useState, useEffect } from "react"
import UserInfo from "../../components/UserInfo/UserInfo"
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader"
import NavBar from '../../components/Navbar';
import { Error } from '../../components/Error';

const StudentView = () => {

    const [student, setStudent] = useState(null)
    const [pendingMeetings, setPendingMeetings] = useState([])
    const [error, setError] = useState(null);
    let { id } = useParams()
    useEffect(() => {
        getStudent(id).then((response) => {
            setStudent(response.data)
            getPendingMeetingsByStudent(id).then((response) => {
                setPendingMeetings(response.data)
            }).catch((error) => {
                setError(<Error status={error.response.status} message={error.response.data.message} />)
            })
        }).catch((error) => {
            setError(<Error status={error.response.status} message={error.response.data.message} />)
        })
    }, [])
    return student && <>
    <NavBar/>
    <div className={styles.studentPage}>
        <UserInfo
            firstName={student.firstName}
            lastName={student.lastName} 
            email= {student.email} 
            editable={id == localStorage.getItem("userId")}
        />
        <Timetable 
             userType='S' 
             id={id} 
         /> 
    </div></> || <>{error}<Loader /></>
}


export { StudentView }

    //    {/* <UserInfo 
    //         firstName={student.firstName} 
    //         lastName={student.lastName} 
    //         email= {student.email}
    //     /> */}