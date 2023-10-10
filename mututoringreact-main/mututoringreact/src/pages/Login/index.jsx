import { loginTutor, loginStudent } from "../../endpoints";
import { Error } from "../../components/Error";
import { useState } from "react";
import styles from './styles.module.css';
import NavBar from "../../components/Navbar";
import { useParams } from "react-router-dom";

export const Login = () => {
    const { userType } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [type, setType] = useState(userType);
    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const handleRes = (response) => {
            if(response.status === 200) {
                localStorage.setItem("userType", type);
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("token", response.data.token);
                window.location.href = `/${type === 'T' ? "tutors" : "students"}/` + response.data.id;
            }
            else {
                setError(<Error message={response.data.message}/>);
            }
        }
        (type === 'T' ? loginTutor : loginStudent)({ email, password }).then((response) => {
            handleRes(response);
        }).catch((error) => {
            setError(<Error message={error.response.data.message}/>)
        });
    }
    return <> <NavBar /> {type && (
                <div className={styles.logIn}>
        <div className={styles.authFormContainer}>
          <h1>{type === 'T' ? "Tutor" : "Student"} Login</h1>
          <form className={styles.logInForm} onSubmit={submit}>
              <label htmlFor="email">Email:</label>
              <input type="email" placeholder="youremail@gmail.com" id="email" name="email"  required onChange = {e => setEmail(e.target.value)}/>
              <label htmlFor="password">password</label>
              <input type="password" placeholder="*******" id="password" name="password" required onChange = {e => setPassword(e.target.value)}/>
              <button type='submit'>Log in</button>
          </form>
          <button className={styles.linkBtn} onClick={() => window.location.href = `/${type === 'T' ? "tutors" : "students"}/signup`}>
            Don't have an account with us? Sign Up Here.
          </button>
          {error}
        </div>
      </div>
    ) || (<div className={styles.btnContainer}>
        <button className={styles.loginBtn} onClick={() => setType("T")}>
            Tutor
        </button>
        <button className={styles.loginBtn} onClick={() => setType("S")}>
            Student
        </button>
    </div>)
    }</>
}