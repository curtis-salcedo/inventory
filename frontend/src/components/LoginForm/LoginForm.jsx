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
    console.log(email, password)
  axios
    .post('/api/login/', { email, password })
    .then((res) => {
      console.log(res.data)
      setUser(res.data)
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

  return (
    <div>
      <h1>Login</h1>
      <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <div>Logout button below should work</div>

      <button onClick={handleLogout}>Logout</button>

      <div>Google</div>
      <button onClick={handleGoogle}>Google Auth</button>

    </div>
  );
}