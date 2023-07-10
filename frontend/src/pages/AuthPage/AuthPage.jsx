import React, {useEffect, useState} from "react";
import axios from 'axios';

// Data Imports
import { logoutUser } from "../../utilities/users-api"

// Component Imports
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

// Style Imports
import { Button } from 'reactstrap';


export default function AuthPage({ user }) {

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(e);
  }

  return (
    <main>
      { user ?
      <>
      <div>User : {user.email}</div>
        <Button onClick={(e) => handleLogout(e)}>Logout</Button>
      </>
      :
      <>
        <LoginForm />
        {/* <SignUpForm /> */}
      </>
      }

    </main>
  );
}