/*
Student
-firstName
-lastName
-email
-password
*/

/**
 * POST register student
 * body: {firstName, lastName, email, password} - strings
 */


import styles from './styles.module.css';
import { registerStudent, checkVerified } from '../../endpoints'
import { Error } from '../../components/Error'

import { AnimatedMessage } from '../../components/AnimatedMessage';
import { Checkmark } from '../../components/checkmark';
import React, {useState} from 'react'
import{
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from './StudentSignUpElements'
import Footer from '../../components/Footer';

export const StudentSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setError(null);
    if(password !== confirmPassword) {
      setError(<Error message={"Passwords do not match"}/>);
      return;
    }
    registerStudent({ email, password, firstName, lastName }).then((response) => {
        if(response.status === 200) {
          setSuccess(<AnimatedMessage message={"Account created successfully!\nWe've sent you an email to verify your account!"} animation={<Checkmark/>} />)
          setInterval(() =>
          checkVerified(response.data.hash).then(() => {
              window.location.href = '/login';
          }).catch(() => {}), 2000);
        }
        else {
            setError(<Error status={error.response.status} message={error.response.data.message}/>);
        }
    }).catch((error) => {
        setError(<Error status={error.response.status} message={error.response.data.message}/>)
    });
}

if(success)
return <div className={styles.container}>{success}</div>;



  return (
    <>
    <Container>
      <FormWrap>
        <Icon to ="/">MU Tutors</Icon>
        <FormContent>
          <Form onSubmit={submit}>
            <FormH1>Become A Student</FormH1>
            <FormLabel htmlFor="firstname">Firstname</FormLabel>
            <FormInput name = "firstName" id='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder=' First Name' />


            <FormLabel htmlFor="lastname">Lastname</FormLabel>
            <FormInput name = "lastName" onChange={(e) => setLastName(e.target.value)} id='lastName' placeholder=' Last Name' />


            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormInput name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder=' Your Email'/>


            <FormLabel htmlFor="password">Password:</FormLabel>
            <FormInput name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder='*******'/>


            <FormLabel htmlFor="password2">Confirm Password:</FormLabel>
            <FormInput name="password2" onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='*******'/>
            <FormButton type='submit'>Sign Up</FormButton>

          <Text onClick={() => window.location.href = '/login/S'}
        >Already have an account? Login Here.</Text>
          </Form>

        </FormContent>
      </FormWrap>
      {error}
    </Container>
    <Footer/>
    </>
  )
}