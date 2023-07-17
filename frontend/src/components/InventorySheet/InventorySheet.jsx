import React, { useContext, useEffect, useState } from 'react';
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
  Spinner,
  Table,
} from "reactstrap";


export default function InventorySheet({ inventoryId }) {
  // Data from DataContext.js file
  const { products, category, inventory } = useContext(DataContext);
  const [ activeInventoryItems, setActiveInventoryItems ] = useState([])
  const [ activeProductList, setActiveProductList ] = useState([])
  const [ itemDetail, setItemDetail ] = useState(false)
  const [ currentItem, setCurrentItem ] = useState([])
  const [ activeInventory, setActiveInventory ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  // Sort State
  const [ sortedColumn, setSortedColumn ] = useState(null);
  const [ sortOrder, setSortOrder ] = useState('asc');
  
  const [ item, setItem ] = useState({
    quantity: "",
    total: "",
    price: "",
  });

  const handleChange = (e, price, total) => {
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
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`/api/inventories/update/${inventoryId}`, activeInventoryItems)
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log('error')
    }
  }

  const fetchInventoryItems = async (id) => {
  axios
    .get(`/api/inventory/items/?inventory_id=${id}`)
    .then((res) => {
      console.log('fetch inventory items at inventory sheet',res.data)
      setActiveInventoryItems(res.data)
    })
    .catch((error) => {
      console.error('Error fetching inventory items:', error);
    });
  };

  const showItemDetail = (e, id) => {
    setCurrentItem(id)
    setItemDetail(!itemDetail)
  }

  const handleSort = (column) => {
    console.log('handleSort', column);
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedItems = [...activeInventoryItems].sort((a, b) => {
    if (a[sortedColumn] < b[sortedColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortedColumn] > b[sortedColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleLoading = () => {
    setIsLoading(false)
  }
  

  useEffect(() => {
    fetchInventoryItems(inventoryId);
    setActiveInventory(inventoryId)
    setIsLoading(false)
  }, [inventoryId])

  return (
    <div>        
      <div>
      { isLoading ? 
        <Spinner
          className="m-5"
          color="success"
          >
          Loading...
        </Spinner>
      :
      <Form>
        <Table striped>
          <thead>
            <tr>
              <th onClick={() => handleSort('inventory_item_id')}>Product Number</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('vendor')}>Vendor</th>
              <th onClick={() => handleSort('category')}>Category</th>
              <th onClick={() => handleSort('sub_category')}>Sub Category</th>
              <th onClick={() => handleSort('price')}>Price</th>
              <th onClick={() => handleSort('count_by')}>Count By</th>
              <th onClick={() => handleSort('quantity')}>Quantity</th>
              <th onClick={() => handleSort('total')}>Total</th>
              <th onClick={() => handleSort('details')}>Details</th>
            </tr>
          </thead>
          <tbody>
            { sortedItems &&
            sortedItems.map((i) => (
              <tr key={i.inventory_item_id}>
              <td>{i.product_number}</td>
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
                  onLoad={handleLoading}
                />
                </td>
                <td>$ {i.total}</td>
                <td><Button
                  onClick={(e) => showItemDetail(e)}
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
        </Table>
      </Form>
      } 
    </div>
    <Button
        onClick={(e) => handleSubmit(e)}
      >Submit</Button>
    <Button
        onClick={(e) => exportToCSV(e, inventoryId)}
      >Export to CSV</Button>
  </div>
  )
}