import styles from './styles.module.css';

import { getPendingMeetingsByTutor, getTutor } from "../../endpoints"
import { Timetable } from "../../components/Timetable/Timetable"
import { useState, useEffect } from "react"
import { TeachingList } from "../../components/TeachingList"
import UserInfo from "../../components/UserInfo/UserInfo"
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader"
import { ReviewList } from '../../components/ReviewList';
import NavBar from '../../components/Navbar';
import { Error } from '../../components/Error';
const TutorView = () => {

    let { id, code } = useParams()
    const [tutor, setTutor] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {
        getTutor(id).then((response) => {
            setTutor(response.data)
        }).catch((error) => {
            setError(<Error status={error.response.status} message={error.response.data.message} />)
        })
    }, [])
    return tutor && (
        <>
            <NavBar />
            <div className={styles.container}>
                <UserInfo
                    firstName={tutor.firstName}
                    lastName={tutor.lastName}
                    email={tutor.email}
                    rating={tutor.rating}
                    editable={id == localStorage.getItem("userId")}
                />
                <TeachingList id={id} />
                <Timetable userType='T' id={id} code={code} />
                <ReviewList tutorId={id} />
            </div>
        </>) || <><Loader />{error}</>

}


export { TutorView }