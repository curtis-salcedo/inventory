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

export default function InventoryShell({ activeInventory, setActiveInventory }) {
  // Data from DataContext.js file
  const { inventory, products, inventoryItems, category, setInventoryItems } = useContext(DataContext);
  const [activeInventoryItems, setActiveInventoryItems] = useState([])
  const [item, setItem] = useState({
    category: "",
    inventory_item_id: "",
    product: "",
    quantity: "",
    total: "",
    price: "",
  });
  
  // Reduce lookups for inventory specific items, products and categories
  const productLookup = products.reduce((lookup, product) => {
    lookup[product.product_id] = product;
    return lookup;
  }, {});
  
  const categoryLookup = category.reduce((lookup, cat) => {
    lookup[cat.category_id] = cat;
    return lookup;
  }, {});

  // useEffect to update the activeInventoryItems state when the activeInventory changes
  useEffect(() => {
    checkForActiveInventoryItems();
  }, [activeInventory])

  const checkForActiveInventoryItems = () => {
    if (activeInventory.inventory_items) {
      // Filter inventoryItems based on inventory_item_id
      const matchingItems = inventoryItems.filter((item) =>
        activeInventory.inventory_items.includes(item.inventory_item_id)
      );
      // Update the activeInventoryItems state with the matching items
      setActiveInventoryItems(matchingItems);
    }
  };

  console.log(activeInventoryItems)
  

  // Handle Change for the form data, update the inventory item that is being edited
  const handleChange = (e, ID, price) => {
    const { value } = e.target;

    // Find the inventory item that matches the ID
    const currInventory = inventoryItems.find((inv) => inv.inventory_item_id === ID)

    // Find the updated total
    const updateTotal = totalCalculation(value, price)

    // Update all fields of the item state with the new data
    const updatedItem = {
      ...currInventory,
      quantity: parseInt(value),
      price: price,
      total: updateTotal,
    };
    
    // Update the item state so data can be displayed dynamically
    const updateItems = activeInventoryItems.map((item) => {
      if (item.inventory_item_id === ID) {
        return updatedItem;
      }
        return item;
    });

    // Update the activeInventoryItems state so total can be dislpayed dynamically
    setActiveInventoryItems(updateItems);

    console.log(updatedItem)
    // Axios calls
    updateItemList(updatedItem, ID);

    // Reset the item state
    setItem({
      category: "",
      inventory_item_id: "",
      product: "",
      quantity: "",
      total: "",
      price: "",
    });
  };

  // Calculate the total for each inventory item
  const totalCalculation = (quantity, price) => {
    return quantity * price
  }

  // Axios calls
  const updateItemList = (item, id) => {
    axios
      .put(`/api/inventory_items/${id}/`, item)
      .catch((err) => console.log(err));
  };

  const refreshItems = () => {
    axios
      .get("/api/inventory_items/")
      .then((res) => setInventoryItems(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Inventory Shell</h1>
      <h2>{activeInventory.name}</h2>
      <h3>{activeInventory.location}</h3>
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
            </tr>
          </thead>
          <tbody>
            { activeInventoryItems.length > 0 &&
            activeInventoryItems.map((i) => (
              <tr key={i.inventory_item_id}>
              <td>{productLookup[i.product]?.name}</td>
              <td>{categoryLookup[i.category]?.name}</td>
              <td>{productLookup[i.product]?.price}</td>
              <td>{productLookup[i.product]?.count_by}</td>
              <td>
                <Input
                type="number"
                id="inventoryItem"
                name="quantity"
                onChange={(e) => handleChange(e, i.inventory_item_id, productLookup[i.product]?.price)}
                defaultValue={i.quantity || 0}
                />
                </td>
                <td>{i.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </div>
  )
}