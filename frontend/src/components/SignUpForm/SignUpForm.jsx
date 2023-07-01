import React, { useState, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { signUp } from '../../utilities/users-api';

// Style Imports
import { 
  Label,
  Form,
  FormGroup,
  Input,
  Button,

} from 'reactstrap';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    signUp(email, password);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post('api/signup/')
    .then(response => {
      console.log(response);
    // Handle the response
      const redirect_url = response.data.redirect_url
      window.location.href = redirect_url;
    })
    .catch(error => {
      // Handle any errors that occur during the request
    });
  }

  return (
    <div style={{ backgroundColor: 'blue' }}>
      <div>SIGN UP</div>
      <Button onClick={handleSignUp}>Sign Up Here</Button>
      {/* <Form>
        <FormGroup>
          <Label>Email</Label>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleSubmit}>Submit Sign Up</Button>
        </FormGroup>
      </Form> */}
    </div>
  );
}
