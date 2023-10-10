import styles from './styles.module.css';
import { updateStudent, updateTutor } from '../../../endpoints';
import { Error } from '../../../components/Error';

import { useState } from 'react';

export const EditForm = ({firstName, lastName, email}) => {
    const [error, setError] = useState(null)
    const submit = (e) => {
        e.preventDefault();
        if (e.target[3].value !== e.target[4].value) {
            setError(<Error message="Passwords do not match" />);
            return;
        }
        const data = {}
        firstName !== e.target[0].value && (data.firstName = e.target[0].value);
        lastName !== e.target[1].value && (data.lastName = e.target[1].value);
        email !== e.target[2].value && (data.email = e.target[2].value);
        e.target[3].value !== "" && (data.password = e.target[3].value);
        const type = localStorage.getItem("userType");
        if (type == "S") {
            updateStudent(data, localStorage.getItem("userId")).then(() => {
                window.location.reload();
            }).catch((error) => {
                setError(<Error message={error.response.data.message} />);
            })
        }
        else if (type == "T") {
            updateTutor(data, localStorage.getItem("userId")).then(() => {
                window.location.reload();
            }).catch((error) => {
                setError(<Error message={error.response.data.message} />);
            })
        }
    }

    return <><form className={styles.editForm} onSubmit={submit}>
        <span>first name:</span>
        <input defaultValue={firstName} type="text" placeholder={firstName} />
        <span>last name:</span>
        <input defaultValue={lastName} type="text" placeholder={lastName} />
        <span>email:</span>
        <input defaultValue={email} type="text" placeholder={email} />
        <span>password:</span>
        <input type="password" placeholder="********" />
        <span>confirm:</span>
        <input type="password" placeholder="********" />
        <button type="submit">Save</button>
    </form>
        {error}</>
}