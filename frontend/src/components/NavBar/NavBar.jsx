// React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Component Imports


// CSS Import
import './NavBar.css'

export default function NavBar() {

  return (
  <nav>
    <div className="NavBarContainer">

    <div className="NavBarLogo">
      <span className="NavBarOne">Inventory</span> 
      <span className="NavBarTwo">Buddy</span>
    </div>

<div className="NavBarLinks">

    <>
      <div>
        <Link>Category Page</Link>
      </div>
      <div>
        <Link>Business Details</Link>
      </div>
    </>

  <div>
    <Link to="">Log Out</Link>
  </div>
</div>

</div>
  </nav>
  );
}