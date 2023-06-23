import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
// Data Imports
import { DataContext } from '../../utilities/DataContext';
// Component Imports

// Styling Imports
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function InventorySheet({ activeInventory }) {
  // Data from DataContext.js file
  const { products, category, inventory } = useContext(DataContext);
  const [ activeInventoryItems, setActiveInventoryItems ] = useState([])
  const [ activeProductList, setActiveProductList ] = useState([])

  const [ item, setItem ] = useState({
    inventory: "",
    product:"",
    category: "",
    quantity: "",
    total: "",
    price: "",
  });

  const categoryLookup = category.reduce((lookup, cat) => {
    lookup[cat.category_id] = cat;
    return lookup;
  }, {});

  const handleChange = (e, productId, productPrice) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      product: productId,
      price: productPrice,
      quantity: value,
      inventory: activeInventory.inventory_id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/api/create_inventory_sheet/", )

    } catch (error) {
      console.log('error')
    }
  }


  useEffect(() => {
    setActiveProductList(products)
  }, [products])

  return (
    <div>
      <h1>Inventory Shell</h1>
      <button
        onClick={(e) => handleSubmit(e)}
      >Submit</button>
      <div>
        
      </div>
      <Form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Count By</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            { activeProductList &&
            activeProductList.map((p) => (
              <tr key={p.product_id}>
              <td>{p.name}</td>
              <td>{categoryLookup[p.category]?.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.count_by}</td>
              <td>
                <Input
                key={p.product_id}
                type="number"
                id="quantity"
                name={p.product_id}
                onChange={(e) => handleChange(e, p.product_id, p.price)}
                defaultValue={0}
                />
                </td>
                <td>{}Total here eventually</td>
                <td>Details here eventually</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </div>
  )
}