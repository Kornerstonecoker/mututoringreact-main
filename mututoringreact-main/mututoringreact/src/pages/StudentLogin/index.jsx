import { useState } from "react";
import { getStudent, loginStudent } from "../../endpoints";
import { Error } from "../../components/Error";
import styles from "./styles.module.css";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  Text,
} from "./StudentLoginElements";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    loginStudent({ email, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("userType", "S");
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("token", response.data.token);
          window.location.href = "/students/" + response.data.id;
        } else {
          setError(
            <Error
              status={error.response.status}
              message={error.response.data.message}
            />
          );
        }
      })
      .catch((error) => {
        setError(
          <Error
            status={error.response.status}
            message={error.response.data.message}
          />
        );
      });
  };
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">MU Tutors</Icon>
          <FormContent>
            <Form onSubmit={submit}>
              <FormH1>Student Login</FormH1>

              <FormLabel htmlFor="email">Email:</FormLabel>
              <FormInput
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormLabel htmlFor="password">Password:</FormLabel>
              <FormInput
                type="password"
                placeholder="*******"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <FormButton type="submit">Log In</FormButton>

              <Text onClick={() => (window.location.href = "/students/signup")}>
                Don't have an account with us? Sign Up Here.{" "}
              </Text>
            </Form>
          </FormContent>
        </FormWrap>
        {error}
      </Container>

      {/* <div className={styles.logIn}>
  <div className={styles.authFormContainer}>
    <h1>Student Login</h1>
    <form className={styles.logInForm} onSubmit={submit}>
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange = {e => setEmail(e.target.value)}/>
        <label htmlFor="password">password</label>
        <input type="password" placeholder="*******" id="password" name="password" onChange = {e => setPassword(e.target.value)}/>
        <button type='submit'>Log in</button>
    </form>
    <button className={styles.linkBtn} onClick={() => window.location.href = "/students/signup"}>
      Don't have an account with us? Sign Up Here.
    </button>
    {error}
  </div>
</div> */}
    </>
  );
};

export { StudentLogin };

// onChange={(e) => setEmail(e.target.value)}
