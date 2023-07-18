import React, { useContext } from "react";
import axios from 'axios';

// Data Imports
import { logoutUser, login_url, signup_url } from "../../utilities/users-api"
import { DataContext } from '../../utilities/DataContext';

// Component Imports

// Style Imports
import './AuthPage.css';
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,

} from 'reactstrap';


export default function AuthPage({ user }) {
  const { business } = useContext(DataContext);
  const login_url = 'http://localhost:8000/accounts/login';
  const logout_url = 'http://localhost:8000/accounts/logout';
  const signup_url = 'http://localhost:8000/accounts/signup';

  console.log(login_url, signup_url)

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(e);
  }

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/accounts/login';
  }

  return (
    <main className='auth-page-container'>
      { user ?
      <>
      <Container className='container'>
        <Card>
          <CardHeader>
            <h3 className='center'>{ business.name }</h3>
          </CardHeader>
          <CardBody className='center'>
            <div>
              <p>Currently logged in as { user.email }</p>
              <p>Business Name: {business.name}</p>
              <p>Business Address: {business.address}</p>
            </div>
          </CardBody>
        </Card>
      </Container>
      <div>User : {user.email}</div>
        <Button onClick={(e) => handleLogout(e)}>Logout</Button>
      </>
      :
      <div>
      <Container>
        <Card className='login-card'>
          <CardBody className='login-card-body'>
            <p>Please login to your account</p>
            <Button color='primary' size='lg' onClick={(e) => handleLogin(e)}>Login</Button>
          </CardBody>
        </Card>
        <p>Don't have an account yet? <a href={signup_url}>Sign Up</a> here!</p>
      </Container>
      </div>
      }

    </main>
  );
}