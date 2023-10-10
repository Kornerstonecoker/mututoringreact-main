
import styles from './styles.module.css';


const Error = ({ status, message }) => {
    if(status == 500 || status == 404 || status == 403 || status == 401)
        window.location.href = '/error/' + status;
    else 
    return (
        <div className={styles.error}>
            <p>{message}</p>
        </div>
    )
}

export { Error };