import { useEffect } from 'react';
import styles from './styles.module.css';

export const Popup = ({ content, whenClosed }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])
    return (
        <div className={styles.popup} onClick={(e) => {
            e.preventDefault();
            whenClosed();
        }}>
            <div className={styles.content}>
                {content}
            </div>
        </div>
    );
}