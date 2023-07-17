import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports

// Styling Imports
import {
  Table,
  Button,
} from 'reactstrap';

export default function UsersTable() {
  const { business, users } = useContext(DataContext);
  const [ businessUsers, setBusinessUsers ] = useState(business.users_data)

  // Sort State
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setBusinessUsers(business.users_data)
  }, [business]);

  const handleSort = (column) => {
    console.log(column)
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const handleShow = (e, user) => {
    console.log(user)
  }

  // const sortedUsers = users.sort((a, b) => {
  //   if (a[sortedColumn] < b[sortedColumn]) {
  //     return sortOrder === 'asc' ? -1 : 1;
  //   }
  //   if (a[sortedColumn] > b[sortedColumn]) {
  //     return sortOrder === 'asc' ? 1 : -1;
  //   }
  //   return 0;
  // });
    
  return (
    <>
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('locations')}>Locations</th>
            <th onClick={() => handleSort('inventories')}>Inventories Counted</th>
            <th onClick={() => handleSort('access')}>Access</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {businessUsers ? (
            businessUsers.map((u) => (
              <tr scope="row" key={u.email}>
                <td>{u.email}</td>
                <td>{u.email}</td>
                <td>{u.email}</td>
                <td>{u.email}</td>
                <td>{u.email}</td>
                <td>{u.email}</td>
                <td>
                  <Button onClick={(e) => handleShow(e, u.user_id)} size="sm" color="primary">
                    Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No users were found or there was an error loading this page. Please refresh the page or contact your account administrator.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};