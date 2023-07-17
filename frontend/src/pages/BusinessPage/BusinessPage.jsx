import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import BusinessMenu from '../../components/Business/BusinessMenu';
import InportCSV from '../../components/ImportCSV/ImportCSV';
import UsersTable from '../../components/Users/UsersTable';

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
  const { business, users } = useContext(DataContext);

  useEffect(() => {

  }, [business]);

  return (
    <main>

      <div>Business Menu</div>
      <BusinessMenu />

      <UsersTable />
      
    </main>
  );
};
