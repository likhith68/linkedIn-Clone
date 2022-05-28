import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import Nav from './Nav';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';


function Header() {
    const[{user},dispatch]=useStateValue();

    const signOut=()=>{
       
        dispatch({
                type:actionTypes.SET_USER,
                user:null,
            })
        .catch(error=>{
            alert(error.message);
        })
    }

  return (
    <div className='header'>
    <div className="header__items">
    <div className="header__Left">
            <div className="header__LeftLogo">
                <a><img src="/images/linkedin.png" alt="" /></a>
            </div>
            <div className="header__LeftSearch">
                <SearchIcon/>
                <input type="text" placeholder='Search' />
            </div>
        </div>
        <div className="header__Right">
            <div className="header__RightWrap">
                <Nav active image="./images/nav-home.svg" text="Home"/>
                <Nav image="./images/nav-network.svg" text="My Network"/>
                <Nav image="./images/nav-jobs.svg" text="Jobs"/>
                <Nav image="./images/nav-messaging.svg" text="Messaging"/>
                <Nav image="./images/nav-notifications.svg" text="Notifications"/>
                <div onClick={signOut}><Nav image={user.photoURL} text="Signout"/></div>
                <Nav image="/images/nav-work.svg" img="images/down-icon.svg" text="Work"/>
            </div>
        </div> 
    </div>        
        
    </div>
  )
}

export default Header

