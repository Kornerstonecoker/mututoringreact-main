import styles from './styles.module.css';

import { Rating } from '../Rating';

export const Review = ( { data, showModule = true }) => {
    const timeSince = (date) => {
        const ellapsed = () => {

        const format = (interval, timeUnit) => {
            let n = Math.floor(interval);
            return n + timeUnit + (n == 1 ? "" : "s");
        }
        let seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) {
            return format(interval, " year");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return format(interval, " month");
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return format(interval, " day");
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return format(interval, " hour");
        }
        interval = seconds / 60;
        if (interval > 1) {
            return format(interval, " minute");
        }
        return format(interval, " second");
        }
        return ellapsed() + " ago";
    }

    return (
        <div className={styles.review}>
            {showModule && <h1>{data.module}</h1>}
            <div className={styles.userContainer}>
                <h2 className={styles.user}>{data.anonymous === 0 && (data.firstName + " " + data.lastName) || "Anonymous"}</h2>
                <p className={styles.date}>{timeSince(new Date(data.date))}</p>
            </div>
            <div className={styles.rating}>
                <Rating size={15} value={data.rating}/>
            </div>
            
            <p className={styles.comment}>{data.comment}</p>
        </div>
    )
}