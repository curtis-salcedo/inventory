import React, { useState } from 'react';

// Component Imports
import Category from '../Category/Category';
import Location from '../Location/Location';
import Product from '../Product/Product';

// Styling Imports
import {
  Button,
} from 'reactstrap';

export default function BusinessMenu() {
  const [showLocation, setShowLocation] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const handleShow = (e) => {
    if (e.target.value === "location") {
      if (showLocation === true) {
        setShowLocation(false);
      } else {
        setShowLocation(true);
        setShowCategory(false);
        setShowProduct(false);
      }
    } else if (e.target.value === "category") {
      if (showCategory === true) {
        setShowCategory(false);
      } else {
        setShowLocation(false);
        setShowCategory(true);
        setShowProduct(false);
      }
    } else if (e.target.value === "product") {
      if (showProduct === true) {
        setShowProduct(false);
      } else {
        setShowLocation(false);
        setShowCategory(false);
        setShowProduct(true);
      }
  }
}


  return (
    <>
    <Button value="location" color='primary' onClick={(e) => handleShow(e)}>Show Locations</Button>
    <Button value="category" color='primary' onClick={(e) => handleShow(e)}>Show Categories</Button>
    <Button value="product" color='primary' onClick={(e) => handleShow(e)}>Show Products</Button>
    <Button value="users" color='primary' onClick={(e) => handleShow(e)}>Show Users</Button>

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

    </div>

    </>
  )
}