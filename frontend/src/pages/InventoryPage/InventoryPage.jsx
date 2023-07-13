import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateInventorySheet from '../../components/CreateInventorySheet/CreateInventorySheet';
import InventorySheet from '../../components/InventorySheet/InventorySheet';
import Location from '../../components/Location/Location';

// Styling Imports
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
} from 'reactstrap';

import '../../components/Components.css'

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  // Show Component Handles
  const [showCreateInventorySheet, setShowCreateInventorySheet] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [activeInventoryId, setActiveInventoryId] = useState([])
  const [activeLocation, setActiveLocation] = useState(null)
  console.log(activeLocation)
  // Data Imports
  const { inventory, locations } = useContext(DataContext);

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

  // Convert the date to a readable format
  function convertDateToName(month, year) {
    const date = new Date(year, month)
    const formatedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return formatedDate
  }

  const handleChange = (e, id) => {
    console.log(id)
    setActiveLocation(id)
  }

  useEffect(() => {
    axios
      .get('/api/inventories/')
      .then((res) => {
        console.log('Inventory Page useEffect axios get', res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
        <button onClick={() => handleShowCreateInventorySheet()}>Create Inventory Sheet
        </button>
      <div>

        <div>View Inventory sheets by location</div>
        <div>
          <Container>

          { locations ? 
            locations.map((l) => (
              <Button key={l.location_id} onClick={(e) => handleChange(e, l.location_id)}>{l.name}</Button>
              ))
              :  <div>No locations added</div>}
          </Container>
        </div>

        <div>Add searchable location tabs that populate all inventories for that location.</div>
        <div>View all Inventory Sheets</div>
      <Container>
        <Row className="custom-card-container">
            { inventory && (
              inventory.map((i) => (
          <Col key={i.inventory_id} md={3}>
              <Card 
                className="my-2"
                color="primary"
                outline
                style={{
                  width: '18rem',
                  height: '10rem'
                }}
              >
                <CardBody>
                  <CardHeader className='custom-card-header' tag="h5">{i.name.slice(0, -5)}</CardHeader>
                  <CardTitle tag="h5">{convertDateToName(i.month, i.year)}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2"></CardSubtitle>
                  <CardFooter className="custom-card-footer">
                    <Button>Edit</Button>
                    <Button onClick={(e) => handleView(e, i.inventory_id)}>View</Button>
                  </CardFooter>
              </CardBody>
            </Card>
          </Col>
              ))
              )
            }
        </Row>
      </Container>
      </div>

      <div>
        { showCreateInventorySheet ? (
          <CreateInventorySheet
          handleShowCreateInventoryShell={handleShowCreateInventorySheet} />
          ) : ( null
        )}
      </div>
      
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