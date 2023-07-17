import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Style Imports
import {
  Table,
  Button,
} from 'reactstrap';

export default function InventoryTable({ handleView, activeLocation }) {
  const { inventory, locations } = useContext(DataContext);
  const [ activeInventory, setActiveInventory ] = useState([])
  const [ activeTabData, setActiveTabData ] = useState([])
  // Sort State
  const [ sortedColumn, setSortedColumn ] = useState(null);
  const [ sortOrder, setSortOrder ] = useState('asc');


  // Convert Month to long form
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }

  // Convert the time to a readable format
  function getDate(timestamp) {
    const date = new Date(timestamp)
    const formatedDate = date.toLocaleTimeString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
    return formatedDate
  }

  // Populate the correct location name
  function getLocationName(id) {
    const location = locations.find((l) => l.location_id === id)
    return location.name
  }

  // Sortable Table
  const handleSort = (column) => {
    console.log('handleSort', column);
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedInventory = activeTabData.sort((a, b) => {
    if (a[sortedColumn] < b[sortedColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortedColumn] > b[sortedColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    if (activeLocation === 'all') {
      axios
        .get('/api/inventories/')
        .then((res) => {
          setActiveTabData(res.data)
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/inventories/`)
        .then((res) => {
          const filteredData = res.data.filter((i) => i.location === activeLocation)
          setActiveTabData(filteredData)
        })
        .catch((err) => console.log(err));
    }
  }, [activeLocation]);

  console.log('activeTabData', sortedInventory)

  return (
    <Table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} >Location</th>
          <th onClick={() => handleSort('month')}>Month</th>
          <th onClick={() => handleSort('year')}>Year</th>
          <th onClick={() => handleSort('created_at')}>Created By</th>
          <th onClick={() => handleSort('updated_at')}>Last Updated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {activeLocation === 'all'
          ? sortedInventory.map((inventory) => (
              <tr key={inventory.inventory_id}>
                <td>{getLocationName(inventory.location)}</td>
                <td>{getMonthName(inventory.month)}</td>
                <td>{inventory.year}</td>
                <td>{inventory.user_email}</td>
                <td>{getDate(inventory.updated_at)}</td>
                <td>
                  <Button
                    color="success"
                    size="sm"
                    onClick={(e) => handleView(e, inventory.inventory_id)}
                  >
                    Open
                  </Button>
                </td>
              </tr>
            ))
          : activeTabData.map((inventory) => (
              <tr key={inventory.inventory_id}>
                <td>{getLocationName(inventory.location)}</td>
                <td>{getMonthName(inventory.month)}</td>
                <td>{inventory.year}</td>
                <td>{inventory.user_email}</td>
                <td>{getDate(inventory.updated_at)}</td>
                <td>
                  <Button
                    color="success"
                    size="sm"
                    onClick={(e) => handleView(e, inventory.inventory_id)}
                  >
                    Open
                  </Button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  )
}