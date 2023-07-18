// React Imports
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Data Imports
import { logoutUser } from '../../utilities/users-api';

// Component Imports


// CSS Import
import './NavBar.css'

// Style Imports
import { 
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


export default function NavBar({ user, business }) {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ confirmLogout, setConfirmLogout ] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(e);
  }

  return (
  <nav>
    <div className="NavBarContainer">
    <div className="NavBarLogo">
      <Link className='logo-link'>
        <span className="NavBarOne">Inventory</span> 
        <span className="NavBarTwo">Buddy</span>
      </Link>
    </div>

    <div className="NavBarLinks">
      { user ? 
        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/inventory">Count</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/business">Business</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/user">Account</NavLink>
          </NavItem>

          {/* <UncontrolledDropdown nav inNavbar direction='down'>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem header>{user.email}</DropdownItem>
              <DropdownItem>Account Business</DropdownItem>
              <DropdownItem href="/auth">Account User</DropdownItem>
              <DropdownItem color="danger" onClick={(e) => handleLogout(e)}>
                  Logout
              </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown> */}

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