import styles from './styles.module.css';
import { getTutorsForModule } from '../../endpoints';

import {
    useState,
    useEffect
} from 'react';


import { Error } from '../../components/Error'
import { TutorCard } from '../TutorCard';

export const TutorContainer = ({ code }) => {
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getTutorsForModule(code).then((response) => {
            setTutors(response.data);
            console.log(response.data);
        }).catch((error) => {
            setError(<Error error={error}/>);
        })
    }, [code])

    return (
        <div className={styles.tutorContainer}>
            <h2>Tutors</h2>
            <div className={styles.tutors}>
                {tutors.map(({id, firstName, lastName, rating}) => 
                    <TutorCard
                        id={id} 
                        firstName={firstName} 
                        lastName={lastName}
                        rating={rating}
                        code={code}
                    />)
                }
            </div>
        </div>    
    )
}