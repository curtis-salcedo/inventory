import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateInventorySheet from '../../components/CreateInventorySheet/CreateInventorySheet';
import InventorySheet from '../../components/InventorySheet/InventorySheet';
import InventoryTable from '../../components/Inventory/InventoryTable';

// Styling Imports
import './InventoryPage.css'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle,
  CardText,
  CardFooter,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  const { inventory, locations } = useContext(DataContext);
  // Show Component Handles
  const [showCreateInventorySheet, setShowCreateInventorySheet] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [activeInventoryId, setActiveInventoryId] = useState([])
  const [activeLocation, setActiveLocation] = useState([])
  const [activeTabData, setActiveTabData] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  const handleShowCreateInventorySheet = () => {
    setShowCreateInventorySheet(!showCreateInventorySheet);
  }

  const handleShowInventory = () => {
    setShowInventory(!showInventory);
  }

  const handleView = (e, id) => {
    axios
      .get(`/api/inventories/${id}/`)
      .then((res) => {
        console.log('handleView at Inventory Page',res.data.inventory_id)
        setActiveInventoryId(res.data.inventory_id)
      });
    setShowInventory(!showInventory)
  }

  const handleChange = (e, id) => {
    setActiveLocation(id)
    setActiveTabData(id)
  }

  useEffect(() => {
    setActiveLocation('all')
    axios
      .get('/api/inventories/')
      .then((res) => {
        // console.log('Inventory Page useEffect axios get', res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='inventory-page-container'>
      <div>

        <Button
          color='primary'
          onClick={() => handleShowCreateInventorySheet()}
          className='inventory-page-button'
          style={{
            width: '18rem',
          }}>Create Inventory Sheet</Button>
      </div>
      <div>
        { showCreateInventorySheet ? (
          <CreateInventorySheet
          handleShowCreateInventoryShell={handleShowCreateInventorySheet} />
          ) : ( null
        )}
      </div>
      <div>
      <Nav tabs>
          <NavItem>
            <NavLink
              className={activeLocation === 'all' ? 'active' : ''}
              onClick={(e) => handleChange(e, 'all')}
              style={{ cursor: 'pointer' }}
            >
              All
            </NavLink>
          </NavItem>
          {locations && locations.map((l) => (
            <NavItem key={l.location_id}>
              <NavLink
                className={activeLocation === l.location_id ? 'active' : ''}
                onClick={(e) => handleChange(e, l.location_id)}
                style={{
                  cursor: 'pointer' ,
                }}
                
              >
                {l.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>

      <InventoryTable handleView={handleView} activeLocation={activeLocation} />

      <div>
        { showInventory ? (
          <InventorySheet
            inventoryId={activeInventoryId}
            handleShowInventory={handleShowInventory}
          />
          ) : ( null
        )}
      </div>

    </main>
  );
};