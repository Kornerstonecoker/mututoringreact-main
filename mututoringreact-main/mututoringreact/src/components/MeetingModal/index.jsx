import React from "react";
import { useParams } from "react-router";
import {
  FaLongArrowAltRight, FaStar
} from "react-icons/fa";
import {
  ImCheckmark
} from "react-icons/im";

import {
  WiTime4
} from "react-icons/wi";

import {
  VscChromeClose
} from "react-icons/vsc";
import styles from "./styles.module.css";
import {
  useState
} from 'react'
import { useEffect } from "react";
import { getStudent, getTutor } from "../../endpoints";
import { Loader } from "../Loader";

import { Error } from "../Error";

import { cancelAsStudent, cancelAsTutor, confirmAsStudent, ConfirmAsTutor } from "../../endpoints";
import { AnimatedMessage } from "../AnimatedMessage";
import { Checkmark } from "../checkmark";
import { Cancel } from "../Cancel";

import { ReviewForm } from "../ReviewForm";

export const MeetingModal = ({ meeting = null, type, onSuccess }) => {
  const [target, setTarget] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(meeting && meeting.location || "online");
  const [link, setLink] = useState("");
  const [error, setError] = useState(null);
  const targetEndpoint = type === "S" ? "tutors" : "students";
  const [animation, setAnimation] = useState(null);
  const [review, setReview] = useState(false);
  const isPending = (type == 'T' && meeting.tutorAccepted == false) || (type == 'S' && meeting.studentAccepted == false)
  const isCancelled = meeting.studentAccepted == 0 && meeting.tutorAccepted == 0
  const inThePast = new Date(meeting.endDate) < new Date()
  const isTutorConfirming = type == 'T' && meeting.tutorAccepted == 0
  useEffect(() => {
    if (type == 'T') {
      getStudent(meeting.studentId).then((response) => {
        setTarget(response.data)
      }).catch((error) => {
        window.location.href = "/error/" + error.response.status
      })
    } else {
      getTutor(meeting.tutorId).then((response) => {
        setTarget(response.data)
      }).catch((error) => {
        window.location.href = "/error/" + error.response.status
      })
    }
  }, [])

  const getDate = (date) => {
    const d = new Date(date).toDateString()
    let day = d.split(" ")[2];
    if (day % 10 == 1)
      day = day + "st";
    else if (day % 10 == 2)
      day = day + "nd";
    else if (day % 10 == 3)
      day = day + "rd";
    else
      day = day + "th";
    return day + " " + d.split(" ")[1]
  }

  const getTime = (date) => {
    const d = new Date(date).toLocaleTimeString()
    const time = d.split(":");
    return time[0] + ":" + time[1] + " " + (time[0] > 12 ? "PM" : "AM")
  }

  const cancel = () => {
    if (type === 'T') {
      cancelAsTutor({ id: meeting.id }).then(() => {
        setAnimation(<AnimatedMessage message={"Lesson canceled!"} animation={<Cancel/>}/>);
        setTimeout(onSuccess, 2000);
      }).catch((err) => {
        setError(<Error message={err.response.data.message} />);
      });
    }
    else if (type === 'S') {
      cancelAsStudent({ id: meeting.id }).then((response) => {
        setAnimation(<AnimatedMessage message={"Lesson canceled!"} animation={<Cancel/>}/>);
        setTimeout(onSuccess, 2000);
      }).catch((err) => {
        setError(<Error message={err.response.data.message} />);
      });
    }
  }

  const confirm = () => {
    if (type === 'T') {
      const data = { id: meeting.id }
      link && (data.link = link);
      location && (data.location = location);
      comment && (data.comment = comment);
      ConfirmAsTutor({ id: meeting.id, link, location, comment }).then(() => {
        setAnimation(<AnimatedMessage message={"Lesson confirmed!"} animation={<Checkmark/>}/>);
        setTimeout(onSuccess, 2000);
      }).catch((err) => {
        console.log(err)
        setError(<Error message={err.response.data.message} />);
      });
    }
    else if (type === 'S') {
      confirmAsStudent({ id: meeting.id }).then(() => {
        setAnimation(<AnimatedMessage message={"Lesson confirmed!"} animation={<Checkmark/>}/>);
        setTimeout(onSuccess, 2000);
      }).catch((err) => {
        console.log(err)
        setError(<Error message={err.response.data.message} />);
      });
    }
  }

  const reschedule = () => {
    window.location.href = "/reschedule/" + meeting.id
  }


  if(review) {
    return <ReviewForm meeting={meeting} onSuccess={() => {
      setReview(null);
      setAnimation(<AnimatedMessage message={"Review posted!"}  animation={<Checkmark/>}/>)
      setTimeout(onSuccess, 2000);
    }}/>
  }

  if (animation)
    return <div className={styles.modalBackground} onClick={e => e.stopPropagation()}>
        {animation}
    </div>
  return meeting && target && (
    <div className={styles.modalBackground} onClick={e => e.stopPropagation()}>
      <div className={styles.modalContainer}>
        <div className={styles.dateContainer}>
          <div className={styles.date}>
            <p className={styles.from}>{getDate(meeting.startDate)}</p>
            <p className={styles.from}>{getTime(meeting.startDate)}</p>
          </div>
          <FaLongArrowAltRight size={48} />
          <div className={styles.date}>
            <p className={styles.to}>{getDate(meeting.endDate)}</p>
            <p className={styles.to}>{getTime(meeting.endDate)}</p>
          </div>
        </div>

        <p className={styles.title}>{meeting.module}</p>
        <div className={styles.target} >
          <span className={styles.left}>Lesson with</span>
          <span className={styles.targetButton} onClick={() => window.location.href = `/${targetEndpoint}/` + target.id}>{target.firstName + " " + target.lastName}</span>
          <span className={styles.left}>location</span>
          {
            isTutorConfirming && !inThePast
            && <input defaultValue={"online"} className={styles.locationInput} type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            || <span>{meeting.location}</span>
          }
          {location === "online" &&
            <>
              <span className={styles.left}>link</span>
              {
                isTutorConfirming && !inThePast
                && <input type='text' onChange={e => setLink(e.target.value)} required />
                || <a href={meeting.link}>{meeting.link}</a>
              }
            </>}
        </div>
        <div className={styles.commentHeader}>
          <span className={styles.splitter}></span>
          <span className={styles.commentTitle}>Comment</span>
          <span className={styles.splitter}></span>
        </div>
        {isTutorConfirming && !inThePast &&
          <textarea className={styles.comment} onChange={e => setComment(e.target.value)} />
          || <p className={styles.comment}>
            {meeting.comment == '' ? "..." : meeting.comment}
          </p>}
        <div className={styles.footer}>
          <div className={styles.splitter}></div>
          <div className={styles.btnContainer}>
            {(!isCancelled && !inThePast &&
              <>
                <button className={styles.cancelBtn} onClick={cancel}><VscChromeClose size={32} /></button>
                <button className={styles.rescheduleBtn} onClick={reschedule}><WiTime4 size={32} /></button>
                {isPending && <button className={styles.confirmBtn} onClick={confirm}><ImCheckmark size={32} /></button>}
              </> )
              || (localStorage.getItem('userType') != 'T' &&  <button className={styles.reviewBtn} onClick={() => setReview(true)}><FaStar size={32}/></button>)}
          </div>
        </div>
        {error}
      </div>
    </div>
  ) || <Loader />
};
