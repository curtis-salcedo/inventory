import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
// Data Imports
import { DataContext } from '../../utilities/DataContext';
import { exportToCSV } from '../../utilities/exportData';
// Component Imports
import ItemDetail from '../ItemDetail/ItemDetail';

// Styling Imports
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";


export default function InventorySheet({ activeInventoryId }) {
  // Data from DataContext.js file
  const { products, category, inventory } = useContext(DataContext);
  const [ activeInventoryItems, setActiveInventoryItems ] = useState([])
  const [ activeProductList, setActiveProductList ] = useState([])
  const [ itemDetail, setItemDetail ] = useState(false)
  const [ currentItem, setCurrentItem ] = useState([])

  const [ item, setItem ] = useState({
    quantity: "",
    total: "",
    price: "",
  });

  const categoryLookup = category.reduce((lookup, cat) => {
    lookup[cat.category_id] = cat;
    return lookup;
  }, {});

  const handleChange = (e, price, total, category) => {
    fetchInventoryItems();
    const { name, value } = e.target;
    console.log(name, value, price, total);
  
    const updatedItems = activeInventoryItems.map((item) => {
      if (item.inventory_item_id === name) {
        return {
          ...item,
          quantity: value,
          total: value * price,
        };
      }
      return item;
    });
  
    setActiveInventoryItems(updatedItems);
  
    let totalCalc = value * price;
    const updatedItem = {
      inventory_item_id: name,
      price: price.toString(),
      quantity: value.toString(),
      total: totalCalc.toFixed(2).toString(),
    };

    axios.patch(`/api/inventory_items/${name}/`, updatedItem)
      .then((res) => console.log(res.data));
    fetchInventoryItems();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`/api/update_inventory_sheet/${activeInventoryId}`, activeInventoryItems)
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log('error')
    }
  }

  const fetchInventoryItems = async () => {
  axios
    .get(`/api/get_inventory_items/?inventory_id=${activeInventoryId}`)
    .then((res) => setActiveInventoryItems(res.data))
    .catch((error) => {
      console.error('Error fetching inventory items:', error);
    });
  };

  const showItemDetail = (e, id) => {
    setCurrentItem(id)
    setItemDetail(!itemDetail)
  }

  useEffect(() => {
    fetchInventoryItems()
    setActiveProductList(products)
  }, [activeInventoryId])

  return (
    <div>
      <button
        onClick={(e) => handleSubmit(e)}
      >Submit</button>
      <button
        onClick={(e) => exportToCSV(e, activeInventoryId)}
      >Export to CSV</button>
      <div>
        
      </div>
      <Form>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Count By</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            { activeInventoryItems &&
            activeInventoryItems.map((i) => (
              <tr key={i.inventory_item_id}>
              <td>{i.inventory_item_id}</td>
              <td >{i.name}</td>
              <td>{i.vendor}</td>
              <td>{i.category}</td>
              <td>{i.sub_category}</td>
              <td>{i.price}</td>
              <td>{i.count_by}</td>
              <td>
                <Input
                key={i.inventory_item_id}
                type="number"
                id="quantity"
                name={i.inventory_item_id}
                onChange={(e) => handleChange(e, i.price, i.total)}
                defaultValue={i.quantity}
                />
                </td>
                <td>$ {i.total}</td>
                <td><Button
                  onClick={(e) => showItemDetail(e, i.inventory_item_id)}
                >Details</Button></td>
              </tr>
            ))}

            { itemDetail &&
              <tr>
                <ItemDetail
                  currentItem={currentItem}
                  itemDetail={itemDetail}
                  setItemDetail={setItemDetail}
                />
              </tr>
            }
          </tbody>
        </table>
      </Form>
    </div>
  )
}