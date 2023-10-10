import styles from './styles.module.css';

export const AnimatedMessage = ({ message, animation, redirect }) => {
    setTimeout(redirect, 4000);
    return <div className={styles.success}>
        <h1>{message}</h1>
        <div className={styles.wrapper}>
            {animation}
        </div>

    </div>
}