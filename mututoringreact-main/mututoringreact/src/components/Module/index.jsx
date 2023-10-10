import styles from './styles.module.css';
import { unsubscribeFromModule } from '../../endpoints';
export const Module = ({data, tutorId, onRemove}) => {

    const unsubscribe = (code) => {
        unsubscribeFromModule(code, tutorId).then(res => {
            onRemove();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={styles.module}>
            <span>{data.module}</span>
            {tutorId === localStorage.getItem("userId") && <span className={styles.removeModuleButton}onClick={(e) => {
                e.preventDefault();
                unsubscribe(data.module);
            }}>x</span>}
        </div>
    )
}