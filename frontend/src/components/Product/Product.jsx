import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import ProductTable from './ProductTable';

// Styling Imports
import {
  Table,
} from 'reactstrap';

export default function Product() {
  const { products } = useContext(DataContext);


  return ( 
    <ProductTable
      products={products}
    />
  )
}