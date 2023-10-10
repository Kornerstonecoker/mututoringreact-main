import styles from './styles.module.css';

export const TimeSlot = ({ data, type, style, onClick, state }) => {
    return (
        <div style={style} className={styles[type]}onClick={onClick}>
            {data}
        </div>
    )
}