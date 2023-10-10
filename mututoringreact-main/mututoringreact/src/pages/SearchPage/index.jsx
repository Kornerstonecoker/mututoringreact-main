import { SearchUI } from "../../components/SearchUI"
import Navbar from "../../components/Navbar"
import styles from "./styles.module.css"
export const SearchPage = () => {
    return <>
    <Navbar/>
        <div className={styles.container}>
            <h1 className={styles.title}>Find a tutor</h1>
            <SearchUI depth={2}/>
            <div className={styles.separator}></div>
        </div>
    </>

}