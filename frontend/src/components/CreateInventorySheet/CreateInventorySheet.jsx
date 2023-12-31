import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports

// Styling Imports
import '../Components.css';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

export default function CreateInventorySheet({ handleShowCreateInventoryShell }) {
  // Data from DataContext.js file
  const { locations, products, inventoryItems, inventory, user } = useContext(DataContext);
  // Lists used to populate data for the form
  const [locationList, setLocationList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  // Active
  const [active, setActive] = useState([])
  const [activeInventory, setActiveInventory] = useState({
    location: "",
    product: "",
    quantity: "",
    total: "",
    created_at: "",
    updated_at: "",
    name: "",
    month: "",
    year: "",
    user: user.email,
  });
  
  // Create InventoryItem's based on every product in the productList by setting a checkbox to true

  // Handle Change for the form data
  const handleChange = (e) => {
    let { name, value } = e.target;
    setActiveInventory({ ...activeInventory, [name]: value });
    console.log(activeInventory)
  };

  async function createInventory() {
    setLocationList(locations)
    setInventoryList(inventoryItems)
    setProductList(products)

    // Generate the name for the inventory shell based on location and date
    const inventoryName = `${activeInventory.location}-${activeInventory.month}${activeInventory.year.slice(2)}`;

    // Find the location object that matches the location name and return the location_id as a number
    const matchLocation = locations.filter(
      (location) => location.name === activeInventory.location)[0];

    // Check if the inventory shell already exists with that name
    const checkExistingInventory = inventory.filter((i) => i.name === inventoryName);

    if (checkExistingInventory.length > 0) {
      return alert('Inventory already exists for this month');
    }

    // Update the inventory shell with the new name and proper location based on selection
    const inventoryData = {
      location: matchLocation.location_id,
      name: inventoryName,
      month: activeInventory.month,
      year: activeInventory.year,
      user: user.email,
    };

    console.log(inventoryData)

    if (activeInventory.inventory_id) {
      axios
        .put(`/api/inventories/${activeInventory.inventory_id}/`, inventoryData)
        .then((res) => {
          setActiveInventory(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/api/inventory/create/", inventoryData)
        .then((res) => {
          setActiveInventory(res.data);
        })
        .catch((err) => console.log(err));
    }
    handleShowCreateInventoryShell();
  };

  return (
    <main>
      <div>
      </div>
      <Container className='container'>
        <Card>
          <CardHeader>
            <div className='title'>Create Inventory Sheet</div>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input type="select" name="location" id="location" onChange={handleChange}>
                  <option value="null">Select Location</option>
                  {locations && locations.map((location) => {
                    return (
                      <option value={location.name} key={location.location_id}>{location.name}</option>
                    )
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="month">Month</Label>
                <Input type="select" name="month" id="month" onChange={handleChange}>
                  <option value="null">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="year">Year</Label>
                <Input type="select" name="year" id="year" onChange={handleChange}>
                  <option value="null">Select Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </Input>
              </FormGroup>
            <div className='button-group'>
              <Button color='primary' onClick={(e) => createInventory(e)}>Create</Button>
            </div>
          </Form>
          </CardBody>
        </Card>
      </Container>
    </main>
  )

}