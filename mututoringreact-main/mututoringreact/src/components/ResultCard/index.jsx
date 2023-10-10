import styles from './styles.module.css';
export const ResultCard = ({ name, code, onClick }) => {
    return (
        <div className={ styles.course } onClick={ onClick }>
            <h3>{ code }</h3>
            <p>{ name }</p>
        </div>
    );
};