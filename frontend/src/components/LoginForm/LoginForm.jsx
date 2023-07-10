import React, { useState } from 'react';
import axios from 'axios';

// Data Imports
import { logoutUser } from '../../utilities/users-api';
import { getUser } from '../../utilities/users-api';

// Component Imports


// Style Imports

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("proxy/accounts/login/")
      .then(response => {
      console.log(response);
    // Handle the response
      console.log(response.data.redirect_url)
      console.log(response.data.close_script)
      console.log(response.data.login_success)
      
      if (response.status === 200) {
        window.location.href = response.data.redirect_url;
        window.open(response.data.redirect_url);
      } else {
        console.log('There was an error trying to load google authentication from the backend at accounts/google/login/request/')
      }
    });
  }
  
  console.log(user)

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(e);
  }

  const handleGoogle = (e) => {
    e.preventDefault();
    axios.post('accounts/google/login/request/')
      .then(response => {
      console.log(response);
    // Handle the response
      console.log(response.data.redirect_url)
      console.log(response.headers.location)
      // window.location.href = response.data.redirect_url;
      if (response.status === 200) {
        window.location.href = response.data.redirect_url;
      } else {
        console.log('There was an error trying to load google authentication from the backend at accounts/google/login/request/')
      }
  })
  .catch(error => {
    // Handle any errors that occur during the request
  });
  }

  const handlePopup = (e) => {
    let popup;
    e.preventDefault();
      axios.post("proxy/accounts/login/")
        .then(response => {
        console.log(response);
      // Handle the response
        console.log(response.data.redirect_url)
        console.log(response.data.close_script)
        console.log(response.data.login_success)
        
        if (response.status === 200) {
          window.location.href = response.data.redirect_url;
          popup = window.open(response.data.redirect_url, "popup","width=600,height=600",);
        } else {
          console.log('There was an error trying to load google authentication from the backend at accounts/google/login/request/')
        }
      });
  }

  return (
    <main>

      { user ?
      <>
      <p>You may log out of your account here</p>
      <button onClick={handleLogout}>Logout</button>
      </>
      :
      <>
        <h1>Login</h1>
        <p>Please login to access your account</p>
        <button onClick={handleLogin}>Login</button>
      </>
      }
    </main>
  );
}