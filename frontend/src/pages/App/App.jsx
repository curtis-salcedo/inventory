import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

// Data Imports

// Page Imports
import LandingPage from "../LandingPage/LandingPage";
import InventoryPage from "../InventoryPage/InventoryPage";
import BusinessPage from "../BusinessPage/BusinessPage";

// Component Imports
import NavBar from "../../components/NavBar/NavBar";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

export default function App() {
  const [user, setUser] = useState();

  console.log(user)

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        {/* Route components in here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </main>
  );
}
