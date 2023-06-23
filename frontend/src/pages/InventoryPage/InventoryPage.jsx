import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateInventoryShell from '../../components/CreateInventoryShell/CreateInventoryShell';
import InventorySheet from '../../components/InventorySheet/InventorySheet';

// Styling Imports
import { Label, Button, Form, FormGroup, Input } from 'reactstrap';

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  
  // Show Component Handles
  const [showCreateInventoryShell, setShowCreateInventoryShell] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [activeInventoryId, setActiveInventoryId] = useState([])

  // Data Imports
  const { business, inventory, products, category } = useContext(DataContext);

  const handleInventorySubmit = (inventory) => {
    if (inventory.inventory_id) {
      axios
        .patch(`/api/inventory/${inventory.inventory_id}/`, inventory)
        .then((res) => console.log(res.data));
      return;
    }
    axios
      .post("/api/inventory/", inventory)
      .then((res) => console.log(res.data));
  };

  const handleShowCreateInventoryShell = () => {
    setShowCreateInventoryShell(!showCreateInventoryShell);
  }

  const handleShowInventory = () => {
    setShowInventory(!showInventory);
  }

  const handleSelectInventory = (e, id) => {
    setShowInventory(!showInventory)
    setActiveInventoryId(id)
  }


  useEffect(() => {
  }, []);

  return (
    <main>
      <div>
        { inventory.map((i) => (
          <Button
          key={i.inventory_id}
          value={i.inventory_id}
          name="inventory_id"
          onClick={(e) => handleSelectInventory(e, i.inventory_id)}
          >
            {i.name}
          </Button>
        )
        )}
      </div>

      <button onClick={() => handleShowCreateInventoryShell()}>CreateInventoryShell
      </button>

      <button onClick={() => handleInventorySubmit()}>Test Submit (Don't Use) </button>

      <div>
        { showCreateInventoryShell ? (
          <CreateInventoryShell
          handleShowCreateInventoryShell={handleShowCreateInventoryShell} />
          ) : ( null
        )}
      </div>
      
      <div>
        { showInventory ? (
          <InventorySheet
            activeInventoryId={activeInventoryId}
            handleShowInventory={handleShowInventory}
          />
          ) : ( null
        )}
      </div>

    </main>
  );
};