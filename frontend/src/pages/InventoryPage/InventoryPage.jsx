import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateInventorySheet from '../../components/CreateInventorySheet/CreateInventorySheet';
import InventorySheet from '../../components/InventorySheet/InventorySheet';

// Styling Imports
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Col,
  Container,
  Row,

} from 'reactstrap';

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  
  // Show Component Handles
  const [showCreateInventorySheet, setShowCreateInventorySheet] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [activeInventoryId, setActiveInventoryId] = useState([])

  // Data Imports
  const { inventory } = useContext(DataContext);

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
  
      {/* <div>
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
      </div> */}

      <div>
      <Container>
        <Row>
            { inventory && (
              inventory.map((i) => (
          <Col key={i.inventory_id} md={3}>
              <Card >
                <CardBody>
                  <CardTitle tag="h5">{i.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{i.name}</CardSubtitle>
                  <CardText>Location: {i.location}</CardText>
                  <CardText>Time: {i.month} / {i.year} </CardText>
                  <CardFooter>
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