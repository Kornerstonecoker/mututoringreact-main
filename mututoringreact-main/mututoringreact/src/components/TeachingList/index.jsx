import styles from './styles.module.css';
import { getModulesByTutor, subscribeToModule, unsubscribeFromModule } from '../../endpoints'
import {
    useState,
    useEffect
} from 'react'
import { Module } from '../Module'
import { Popup } from '../Popup'
import { SearchUI } from '../SearchUI'
export const TeachingList = ({ id }) => {
    const [teaching, setTeaching] = useState([]);
    const [popup, setPopup] = useState(null);


    const fetchTeaching = () => {
        getModulesByTutor(id).then((response) => {
            setTeaching(response.data);
        });
    };

    const subscribe = (code) => {
        subscribeToModule(code, id).then(res => {
            fetchTeaching();
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchTeaching();
    }, []);

    return <div className={styles.container}>
        <h2>Teaching</h2>
        <div className={styles.moduleContainer}>
            {teaching && teaching.map(m =>
                <Module
                    tutorId={id}
                    data={m}
                    onRemove={fetchTeaching}
                />)}
            {id === localStorage.getItem("userId") && <span className={styles.addButton} onClick={() => { 
                setPopup(<Popup
                    whenClosed={() => setPopup(null)}
                    content={
                        <div className={styles.searchContainer}>
                        <SearchUI
                            depth={1}
                            onResult={(code) => {
                                subscribe(code);
                                setPopup(null);
                            }}
                        />
                        </div>
                    }/>
                    )
            }}>+</span>}
        </div>
        {popup}
    </div>
}