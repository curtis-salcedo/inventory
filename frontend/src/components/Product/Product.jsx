import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import ProductTable from './ProductTable';
import ImportCSV from '../ImportCSV/ImportCSV';

// Styling Imports
import {
  Table,
} from 'reactstrap';

export default function Product() {
  const { products } = useContext(DataContext);
  const [ showImportCSV, setShowImportCSV ] = useState(false);
  // Import CSV File show component

  return ( 
    <main>
      { showImportCSV ? <ImportCSV /> : null}

      <ProductTable
        products={products}
        showImportCSV={showImportCSV}
        setShowImportCSV={setShowImportCSV}
      />

    </main>
  )
}