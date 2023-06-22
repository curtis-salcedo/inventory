import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

// Data Imports

// Page Imports
import LandingPage from "../LandingPage/LandingPage";
import InventoryPage from "../InventoryPage/InventoryPage";

// Component Imports
import NavBar from "../../components/NavBar/NavBar";

import Apps from "./Apps";

export default function App() {
  const [user, setUser] = useState();

  console.log(user)

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />

      {/* THIS IS THE OLD APPS.JS FILE AS A PLACEHOLDER */}
        <Apps />
      
      <Routes>
        {/* Route components in here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </main>
  );
}
