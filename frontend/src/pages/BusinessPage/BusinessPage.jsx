import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import Category from '../../components/Category/Category';
import Product from '../../components/Product/Product';
import Location from '../../components/Location/Location';

// Styling Imports

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


export default function BusinessPage() {
  // Data Imports
  const { business } = useContext(DataContext);

  useEffect(() => {

  }, [business]);

  return (
    <main>

      <div>Business Name: {business.name}</div>

      <div>Manage Locations</div>
      <Location />

      <div>Manage Products</div>
      <Product />

      <div>Manage Category</div>
      <Category />


      
    </main>
  );
};
