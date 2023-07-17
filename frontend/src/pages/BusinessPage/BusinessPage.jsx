import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import BusinessMenu from '../../components/Business/BusinessMenu';
import InportCSV from '../../components/ImportCSV/ImportCSV';

// Styling Imports
import { Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap';

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


export default function BusinessPage() {
  const { business } = useContext(DataContext);

  useEffect(() => {

  }, [business]);

  console.log('BusinessPage', business)

  return (
    <main>

      <div>Business Menu</div>
      <BusinessMenu />
      
    </main>
  );
};
