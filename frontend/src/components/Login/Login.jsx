import React, { useState } from 'react';
import axios from 'axios';

// Component Imports
import Register from '../Register/Register';

import { DataContext } from '../../utilities/DataContext';

// Style Imports

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user } = React.useContext(DataContext);
  console.log(user)

  const handleLogin = (e) => {
    axios
      .post('/api/login/', { username, password })
      .then((res) => console.log(res.data));
  }

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <div>
        <div>Register Here</div>
        <Register />
      </div>
    </div>
  );
}