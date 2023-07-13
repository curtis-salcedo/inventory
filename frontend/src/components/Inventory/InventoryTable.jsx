import React from 'react';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Style Imports
import { Table } from 'reactstrap';

export default function InventoryTable() {
  const { inventory, locations } = useContext(DataContext);

  return (
    <Table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Month</th>
          <th>Year</th>
          <th>Counted By</th>
          <th>Submitted On</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((inventory) => (
          <tr key={inventory.id}>
            <td>{inventory.location}</td>
            <td>{inventory.month}</td>
            <td>{inventory.year}</td>
            <td>{inventory.counted_by}</td>
            <td>{inventory.submitted_on}</td>
            <td>
              <Button
                color="success"
                size="sm"
                onClick={(e) => handleView(e, inventory.id)}
              >
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}