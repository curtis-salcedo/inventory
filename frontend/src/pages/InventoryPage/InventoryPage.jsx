import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateInventoryShell from '../../components/CreateInventoryShell/CreateInventoryShell';
import ShowInventoryShell from '../../components/ShowInventories/ShowInventories';
import ProductMix from '../../components/ProductMix/ProductMix';

// Styling Imports
import { Form, FormGroup, Input } from 'reactstrap';

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [productList, setProductList] = useState([]);
  const [inventoryItemList, setInventoryItemList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [modal, setModal] = useState(false);
  
  // Show Component Handles
  const [showCreateInventoryShell, setShowCreateInventoryShell] = useState(false);
  const [showInventoryShell, setShowInventoryShell] = useState(false);

  // Data Imports
  const { inventory, inventoryItems, products, category } = useContext(DataContext);

  // Create InventoryItem's based on every product in the productList
  async function createInventoryItems() {
    let itemList = productList.map((p) => {
      return {
        product: p.product_id,
        category: p.category,
        quantity: 0,
        total: 0.0,
      };
    });
    itemList.forEach((item) => {
      console.log('itemList', item)
      axios
      .post("/api/inventory_items/", item)
      .then((res) => {
        console.log('res', res)
        setInventoryItemList(res.data)
        refreshProductList();
      })
      .catch((err) => console.log(err));
    });
    // setInventoryItemList(itemList);
    refreshProductList();
  } 

  const handleInventorySubmit = (inventory) => {
    if (inventory.inventory_id) {
      axios
        .put(`/api/inventory/${inventory.inventory_id}/`, inventory)
        .then((res) => refreshProductList());
      return;
    }
    axios
      .post("/api/inventory/", inventory)
      .then((res) => refreshProductList());
  };

  useEffect(() => {
    setItemList(inventoryItemList);
    refreshProductList();
    refreshInventoryList();
    refreshLocaitonList();
  }, []);

  // Refresh data via AXIOS
  const refreshInventoryList = () => {
    axios
      .get("/api/inventory/")
      .then((res) => setInventoryList(res.data))
      .catch((err) => console.log(err));
  };

  const refreshProductList = () => {
    axios
      .get("/api/products/")
      .then((res) => setProductList(res.data))
      .catch((err) => console.log(err));
  };

  const refreshLocaitonList = () => {
    axios
      .get("/api/location/")
      .then((res) => setLocationList(res.data))
      .catch((err) => console.log(err));
  };

  const handleShowCreateInventoryShell = () => {
    setShowCreateInventoryShell(!showCreateInventoryShell);
  }

  const handleShowInventoryShell = () => {
    setShowInventoryShell(!showInventoryShell);
  }

  return (
    <main>
      {/* <ProductMix /> */}
      <button onClick={() => handleShowCreateInventoryShell()}>CreateInventoryShell
      </button>

      <button onClick={() => handleShowInventoryShell()}>ShowInventories</button>

      <button onClick={() => handleInventorySubmit()}>Test Submit (Don't Use) </button>

      <button onClick={() => createInventoryItems()}>CreateItems</button>
      <div>
        { showCreateInventoryShell ? (
          <CreateInventoryShell
          handleShowCreateInventoryShell={handleShowCreateInventoryShell} />
          ) : ( null
        )}
      </div>
      
      <div>
        { showInventoryShell ? (
          <ShowInventoryShell
          handleShowInventoryShell={handleShowInventoryShell}
          inventoryList={inventoryList}/>
          ) : ( null
        )}
      </div>

    </main>
  );
};