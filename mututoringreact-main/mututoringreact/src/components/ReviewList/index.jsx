import { getReviewByTutor, getReviewByTutorAndModule } from '../../endpoints';
import styles from './styles.module.css';
import { Review } from '../Review';
import {
    useState,
    useEffect
}   from 'react';
import { Error } from '../Error';

export const ReviewList = ({ tutorId }) => {
    
        const [reviews, setReviews] = useState(null);
    
        useEffect(() => {
            getReviewByTutor(tutorId).then((response) => {
                setReviews(response.data);
            }).catch((error) => {
                <Error status={error.status}/>
            });
        }, [tutorId]);
    
        return reviews && (
            <div className={styles.container}>
                <h2>Reviews</h2>
                <div className={styles.separator}/>
                <div className={styles.reviewList}>
                    {reviews && reviews.map((review) => {
                        return (
                            <Review data={review} showModule={true} />
                        )
                    })}
                </div>
            </div>
        )
}