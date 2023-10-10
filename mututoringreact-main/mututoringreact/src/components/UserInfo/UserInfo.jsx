import { Rating } from '../Rating';
import styles from './styles.module.css';
import { FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { EditForm } from './EditForm';

function UserInfo({ firstName, lastName, email, rating = undefined, editable = false }) {
  const [editIcon, setEditIcon] = useState(null);
  const [editForm, setEditForm] = useState(null);
  useEffect(() => {

    if (editable) {
      setEditIcon(<div className={styles.editButtonContainer}>{!editForm && <FaPen size={32} className={styles.editButton} onClick={() =>
        setEditForm(<EditForm
          firstName={firstName}
          lastName={lastName}
          email={email} 
          />)
      } /> || <span onClick={() =>
        setEditForm(null)
      } className={styles.editButton}>X</span>}</div>);
    }
  }, [editForm])
  return (
    <div className={styles.userContainer}>
      <img src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="Setting User Avatar In Specific Size, Without Breaking - Avatar Png@pngkey.com"></img>
      {!editForm && <>
        {rating && <div className={styles.rating}><Rating value={rating} /></div>}
        <div className={styles.name}>{firstName + " " + lastName}</div>
        <div className={styles.email}>{email}</div>
      </> || editForm}
      {editable && editIcon}
    </div>
  );
}

export default UserInfo;