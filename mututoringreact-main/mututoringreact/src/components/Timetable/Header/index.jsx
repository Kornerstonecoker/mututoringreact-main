import styles from './styles.module.css';


export const Header = ({ date, forMerged = false, editable = false, onPrevWeek, onNextWeek, onThisWeek, onNewMeeting, onNewBusy }) => {
    return (
        <div className={styles.header}>
            {!forMerged && !editable && <button className={styles.meetingButton} onClick={onNewMeeting}>+ New Meeting</button>}
            <p onClick={onThisWeek}>{date.split('-').reverse().join('-')}</p>
            {!forMerged && editable && <button className={styles.smallButton} onClick={onNewBusy}>{"+"}</button>}
            <button className={styles.smallButton} onClick={onPrevWeek}>{"<"}</button>
            <button className={styles.smallButton} onClick={onNextWeek}>{">"}</button>
        </div>
    )
}
