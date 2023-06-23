import React, {useState, useContext} from 'react';
import axios from "axios";
// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import InventorySheet from '../InventorySheet/InventorySheet';

// Styling Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
} from "reactstrap";

export default function ShowInventoryShells() {
  const { inventoryItems, inventory, locations } = useContext(DataContext);
  const [activeInventory, setActiveInventory] = useState({
    location: "",
    product: "",
    quantity: "",
    total: "",
    created_at: "",
    updated_at: "",
    name: "",
  });

  // Import all inventory shells from the database
  
  // Make sure inventory names are unique with location, month, year

  // Refresh inventory list for viewing

  const handleCheckItemList = () => {
    console.log('inventoryItems', inventoryItems)
  }

  const handleGetInventory = (inv) => {
    setActiveInventory(inv)
    // Find the location name that matches the location id
    
    let inventoryData = {
      ...inv,
      location: locations.filter((location) => location.location_id === inv.location)[0].name,
    }

    setActiveInventory(inventoryData)
  }
  
  return (
    <div>

      <h1>Created Inventory Shells</h1>
      <div>
        { inventory && inventory.map((inv) => {
          return (
            <div key={inv.inventory_id}>
              <button
              className='btn btn-primary mr-2'
              onClick={() => handleGetInventory(inv)}
              >{inv.name}</button>
            </div>
          )}
        )}
      </div>

      <div>
        <h2>Currently Viewing Inventory</h2>
        { activeInventory ? 
          <InventorySheet activeInventory={activeInventory} setActiveInventory={setActiveInventory}/>
        : null }
      </div>

    </div>
  )
}