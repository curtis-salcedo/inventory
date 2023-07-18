import React, { useState, useEffect, useContext } from "react";

// Data Imports
import { DataContext } from "../../utilities/DataContext";
import { logoutUser } from "../../utilities/users-api";

// Component Imports

// Styling Imports
import "./UserPage.css"
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

export default function UserPage({ user }) {
  const { business, locations } = useContext(DataContext);
  const logout_url = 'http://localhost:8000/accounts/logout';

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(e);
  }

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/accounts/login';
  }

  useEffect(() => {

  }, [user])

  return (
    <main className='user-page-container'>
    { user ?
    <>
    <Container className='user-container'>
    <Button className='user-logout-button' onClick={(e) => handleLogout(e)}>Logout</Button>
      <Card className='user-card'>
        <CardHeader className='user-card-header'>
          <h3>{ user.name }</h3>
        </CardHeader>
        <CardBody className='center'>
          <div>
            <p>Currently logged in as { user.email }</p>
            <p>Business Name: {business.name}</p>
            <p>Business Address: {business.address}</p>
            <p>Locations Available: </p>
          </div>
        </CardBody>
      </Card>
    </Container>
    </>
    :
    <div>
      <p>Please log in to your account to view your account information.</p>
    </div>
    }
  </main>
  )
}