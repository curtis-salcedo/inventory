import React, { useContext, useState } from "react";
import axios from "axios";

// Data Imports
import { DataContext } from "../../utilities/DataContext";
// Component Imports

// Styling Imports
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function ProductMix() {
  // Data from DataContext.js file
  const { inventory, products, inventoryItems, category, locations } = useContext(DataContext);
  const [activeLocation, setActiveLocation] = useState('')
  const [productArray, setProductArray] = useState([])
  const [name, setName] = useState('')

  // HandleCheckboxChange to update the productArray state by recording product number
  const handleCheckboxChange = (e, product_id) => {
    if (e.target.checked) {
      setProductArray([...productArray, product_id])
    } else {
      setProductArray(productArray.filter((product) => product !== product_id))
    }
  }

  // HandleLocationChange to update the activeLocation state
  const handleLocationChange = (e) => {
    setActiveLocation(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productArray);
    
    // Find the Location instance based on activeLocation
    const selectedLocation = locations.find((location) => location.name === activeLocation);
  
    if (selectedLocation) {
      axios
        .post("/api/create_product_mix/", {
          location: selectedLocation.location_id,
          products: productArray,
          name: name,
        })
        .then((res) => {
          console.log(res.data);
          setProductArray([]);
          setName('');
        })
        .catch((err) => console.log(err));
    } else {
      console.log(`Location "${activeLocation}" not found.`);
    }
  };
  

  return (
    <div>
      <div>Product Mix creation for {activeLocation}</div>
      <Form>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="select" name="location" id="location" onChange={handleLocationChange}>
            <option value="null">Select Location</option>
            {locations && locations.map((location) => {
              return (
                <option value={location.name} key={location.location_id}>{location.name}</option>
              )
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" value={name} onChange={handleNameChange} />
        </FormGroup>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Category</th>
            <th>Price</th>
            <th>Add to Mix</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.product_id}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <FormGroup>
                    <Input
                      type="checkbox"
                      name="addToMix"
                      id="addToMix"
                      value={product.product_id}
                      onChange={(e) => handleCheckboxChange(e, product.product_id)}
                    />
                  </FormGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}