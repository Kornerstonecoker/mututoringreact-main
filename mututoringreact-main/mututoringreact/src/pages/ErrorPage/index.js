
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';


const ErrorPage = ({ c }) => {
    const { code } = useParams()
    let actual = code ? code : c
    let res = {
        "401": "Seems like you're not logged in. Please log in to continue.",
        "403": "Seems like you don't have permission to access this page. Please log in to continue.",
        "498": "Verification token expired.",
        "404": "What you are looking for cannot be found.",
        "500": "Oops. Something went wrong. Please try again.",
    }
    return (
        <div className={styles.error}>
            <p>{res[actual] && res[actual] || "Unknown error"}</p>
        </div>
    )
}

export { ErrorPage };