import { Rating } from '../Rating';
import styles from './styles.module.css';

export const TutorCard = ({ id, firstName, lastName, rating, code }) => {
    return (
        <div className={styles.tutorCard} onClick={
            (e) => {
                e.preventDefault();
                window.location.href = `/tutors/${id}/${code}`;
            }
        }>
        <img src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="Setting User Avatar In Specific Size, Without Breaking - Avatar Png@pngkey.com"></img>
        <h3>{firstName} {lastName}</h3>
        <div className={styles.rating}>
            <Rating value={rating} />
        </div>
        </div>
    )
}