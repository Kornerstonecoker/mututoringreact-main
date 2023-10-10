import React from 'react'
import styles from './styles.module.css';
import {
    useState
} from "react";
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';
import { AnonButton } from './AnonButton';
import { postMeeting, postReview } from '../../endpoints';
import { Rating } from '../Rating';
import { ImCheckmark } from 'react-icons/im';

// export default function Review() {

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

}


export const ReviewForm = ({ meeting, onSuccess }) => {
    const { id, tutorId, studentId, module } = meeting;
    // Rating(stars) and comments
    const [rating, setRating] = useState(0);
    const [anonymous, setAnonymous] = useState(false);
    const [comment, setComment] = useState(false);


    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        postReview({ 
            rating: rating, 
            comment: comment, 
            meetingId: id,
            module: module, 
            studentId: studentId, 
            tutorId: tutorId, 
            anonymous: anonymous 
        }).then((response) => {
            onSuccess();
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <div className={styles.container} onClick={e => e.stopPropagation()}>
            <h1>What's your opinion about the lesson?</h1>
            <Rating editable={true} size={32} onEdit={(rating) => setRating(rating)}/>
            <form onSubmit={submit}>
                <div className={styles.commentTitle}>
                    <div className={styles.separator}></div>
                    <p>Comment</p>
                    <div className={styles.separator}></div>
                </div>
                {rating > 0 &&  <><textarea
                    placeholder="What's your feedback"
                    onChange={(e) => setComment(e.target.value)}
                />
                <AnonButton anonymous={anonymous} setAnonymous={setAnonymous} />
                </>}
                <div className={styles.separator}></div>
                <button className={styles.reviewBtn}><ImCheckmark size={32}/></button>
            </form>
        </div>
    )
}