import { AnimatedMessage } from '../../components/AnimatedMessage';
import { Checkmark } from '../../components/checkmark';
import styles from './styles.module.css';

export const Verify = () => {
    return <div className={styles.container}>
        <AnimatedMessage message={'Successfully verified!'} animation={<Checkmark/>}/>
    </div>
}