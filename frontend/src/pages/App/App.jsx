import React, { useLayoutEffect, useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

// Data Imports
import { getUser } from "../../utilities/users-api"

// Page Imports
import LandingPage from "../LandingPage/LandingPage";
import InventoryPage from "../InventoryPage/InventoryPage";
import BusinessPage from "../BusinessPage/BusinessPage";
import Auth from "../AuthPage/AuthPage";

// Component Imports
import NavBar from "../../components/NavBar/NavBar";
import Login from "../../components/LoginForm/LoginForm";
import Register from "../../components/SignUpForm/SignUpForm";
import AuthPage from "../AuthPage/AuthPage";


export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
    }

    fetchUser();
  }, []);

  console.log(user);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ?
      <Routes>
        {/* Route components in here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
      : 
        <AuthPage />
      }
    </main>
  );
}
