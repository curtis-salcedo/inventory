import React, { useState, useContext } from 'react';
import axios from 'axios';

// Style Imports
import { Label } from 'reactstrap';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {

      axios
      .post('/api/user/', { email, password })
      .then((res) => console.log(res.data))
      .catch (error => {
        console.log(error.response.data)
      })
    }

  return (
    <div>
      <Label>Email</Label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Login</button>
    </div>
  );
}