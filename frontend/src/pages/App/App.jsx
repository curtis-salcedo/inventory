import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

// Page Imports
import LandingPage from "../LandingPage/LandingPage";

// Component Imports
import NavBar from "../../components/NavBar/NavBar";
import CreateCategory from "../../components/CreateCategory/CreateCategory";

export default function App() {
  const [user, setUser] = useState();

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        {/* Route components in here */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </main>
  );
}
