import React, { useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import UsersTable from './UsersTable';

// Styling Imports
import {

} from 'reactstrap';

export default function Users() {
  const { users } = useContext(DataContext);

  return ( 
    <main>
      <UsersTable
        users={users}
      />

    </main>
  )
}