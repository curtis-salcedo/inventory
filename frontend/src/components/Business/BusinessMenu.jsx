import React, { useState } from 'react';

// Component Imports
import Category from '../Category/Category';
import Location from '../Location/Location';
import Product from '../Product/Product';
import Users from '../Users/UsersTable';

// Styling Imports
import {
  Button,
  ButtonGroup,
} from 'reactstrap';

export default function BusinessMenu() {
  const [showLocation, setShowLocation] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showProduct, setShowProduct] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const handleShow = (e) => {
    if (e.target.value === "location") {
      if (showLocation === true) {
        setShowLocation(false);
      } else {
        setShowLocation(true);
        setShowCategory(false);
        setShowProduct(false);
        setShowUsers(false)
      }
    } else if (e.target.value === "category") {
      if (showCategory === true) {
        setShowCategory(false);
      } else {
        setShowLocation(false);
        setShowCategory(true);
        setShowProduct(false);
        setShowUsers(false)
      }
    } else if (e.target.value === "product") {
      if (showProduct === true) {
        setShowProduct(false);
      } else {
        setShowLocation(false);
        setShowCategory(false);
        setShowProduct(true);
        setShowUsers(false)
      }
    } else if (e.target.value === "users") {
      if (showUsers === true) {
        setShowUsers(false);
      } else {
        setShowLocation(false);
        setShowCategory(false);
        setShowProduct(false);
        setShowUsers(true);
      }
  }
}


  return (
    <>
    <div className='button-group'>

      <ButtonGroup className='me-2'>
        <Button value="location" color='primary' onClick={(e) => handleShow(e)}>Locations</Button>
      </ButtonGroup>

      <ButtonGroup className='me-2'>
        <Button value="category" color='primary' onClick={(e) => handleShow(e)}>Categories</Button>
      </ButtonGroup>

      <ButtonGroup className='me-2'>
        <Button value="product" color='primary' onClick={(e) => handleShow(e)}>Products</Button>
      </ButtonGroup>

      <ButtonGroup className='me-2'>
        <Button value="users" color='primary' onClick={(e) => handleShow(e)}>Users</Button>
      </ButtonGroup>

    </div>

    <div>

    { showLocation ? 
      <Location />
    : null }

    { showCategory ?
    <Category />
    : null }

    { showProduct ?
      <Product />
    : null }

    { showUsers ?
      <Users />
    : null }

    </div>

    </>
  )
}