import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Data Imports
import { DataContext } from "../../utilities/DataContext";
// Component Imports

// Styling Imports
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function ProductMix({ activeLocation, activeProductMix, toggleMix  }) {
  // Data from DataContext.js file
  const { inventory, products, inventoryItems, category } = useContext(DataContext);

  // States
  const [productArray, setProductArray] = useState([])
  const [location, setLocation] = useState('')
  const [activeInventoryItems, setActiveInventoryItems] = useState([])
  const [activeProductMixItems, setActiveProductMixItems] = useState([])


  const fetchProductMixItems = async () => {
    axios
      .get(`/api/product_mix/${activeProductMix}`)
      .then((res) => { 
        console.log(res.data)
        setActiveInventoryItems(res.data) })
      .catch((err) => console.log(err));
    };
    
  const fetchData = () => {
    try {
      const queryParam = activeInventoryItems;
      axios.get('/api/inventory/items/find', {
      params: { inventoryItems: queryParam },
    })
      .then((response) => {
        setActiveProductMixItems(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error:', error);
  }
};

  // HandleCheckboxChange to update the productArray state by recording product number
  const handleCheckboxChange = (e, product_id) => {
    if (e.target.checked) {
      setProductArray([...productArray, product_id])
    } else {
      setProductArray(productArray.filter((product) => product !== product_id))
    }
  }  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .put(`/api/product_mix/${activeProductMix}/`, { ...activeProductMix, productArray })
      .put(`/api/update_product_mix_items/`, { productArray, activeProductMix })
      .then((res) => {
        console.log(res.data)
        toggleMix(false)
      }
      )
      .catch((err) => console.log(err));
  };

  const isChecked = (product_id) => {
    let isActive = activeProductMixItems.map((item) => item.fields.product)
    if (isActive.includes(product_id)) {
      return true
    }
    return false
  }

  useEffect(() => {
    fetchProductMixItems();
    setLocation(activeLocation)
  }, [activeLocation])

  useEffect(() => {
    fetchData();
  }, [activeInventoryItems])


  return (
    <>
    { activeProductMix ? 
      <div>
      <div>Product Mix creation for {activeLocation}</div>
      <Form>
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
                      name="item"
                      id="item"
                      value={product.product_id}
                      checked={isChecked(product.product_id)}
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
        : null
      }
      </>
  );
}