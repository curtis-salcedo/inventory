import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

// Page Imports
import LandingPage from "../LandingPage/LandingPage";
import InventoryCountPage from "../InventoryCountPage/InventoryCountPage";

// Component Imports
import NavBar from "../../components/NavBar/NavBar";

import Apps from "./Apps";

export default function App() {
  const [user, setUser] = useState();

  console.log(user)

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />

      <Apps />
      
      <Routes>
        {/* Route components in here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/inventory" element={<InventoryCountPage />} />
      </Routes>
    </main>
  );
}
