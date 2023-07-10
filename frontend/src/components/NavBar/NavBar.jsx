// React Imports
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports


// CSS Import
import './NavBar.css'

// Style Imports
import { 
  Alert,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,


} from 'reactstrap';


export default function NavBar({ user }) {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  return (
  <nav>
    <div className="NavBarContainer">

    <div className="NavBarLogo">
      <span className="NavBarOne">Inventory</span> 
      <span className="NavBarTwo">Buddy</span>
    </div>

  <div className="NavBarLinks">
    { user ? 
    
    <Nav>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/inventory">Count Inventory</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/business">My Business Page</NavLink>
      </NavItem>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down" > 
        <DropdownToggle caret size="md" >
          Account
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{user.email}</DropdownItem>
          <DropdownItem href="/business">Account Business</DropdownItem>
          <DropdownItem href="/auth">Account User</DropdownItem>
          <DropdownItem color="danger">
              Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>

      :
    <Nav>
      <NavItem>
        <NavLink href="/auth">Sign In</NavLink>
      </NavItem>
    </Nav> 
    }
  </div>
</div>
  </nav>
  );
}