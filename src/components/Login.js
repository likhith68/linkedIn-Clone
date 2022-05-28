import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import {auth,provider} from '../firebase'
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

function Login() {
    const[{user},dispatch]=useStateValue();

    const SignIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            console.log(result);
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch(error=>{
            alert(error.message);
        })
    }
  return (
    <div className='login'>
        <div className='login__header'>
            <div className="login__headerLeft">
                <a href="/">
                    <img src="/images/login-logo.svg" alt="" /> 
                </a>
            </div>
            <div className="login__headerRight">
                <Button target="_blank" href="https://www.linkedin.com/signup/cold-join?trk=guest_homepage-basic_nav-header-join" className='loginbtn'>Join now</Button>
                <Button onClick={SignIn} className='signin'>Sign in</Button>
            </div>
        </div>
        <div className="login__section">
            <div className="login__sectionInfo">
                <h1>Welcome to your Professional Community</h1>
                <img src="/images/login-hero.svg" alt="" />
            </div>
            <div className="login__sectionForm">
                <Button onClick={SignIn} className="login__Google">
                    <img src="/images/google.svg" alt="" />Sign in with Google
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Login
