import styles from './styles.module.css';


export const AnonButton = ({ anonymous, setAnonymous }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setAnonymous(!anonymous);
    }

    return (
        <button onClick={handleClick} className={`${styles.anonButton} ${styles[anonymous]}`}>{!anonymous ? 'I want my name to be shown' : 'I want to remain anonymous'}</button>
    )
}