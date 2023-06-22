import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [locations, setLocations] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locationResponse = await axios.get("/api/location");
      setLocations(locationResponse.data);

      const businessResponse = await axios.get("/api/business");
      setBusinesses(businessResponse.data);

      const productResponse = await axios.get("/api/products");
      setProducts(productResponse.data);

      const categoryResponse = await axios.get("/api/category");
      setCategory(categoryResponse.data);

      const inventoryResponse = await axios.get("/api/inventory");
      setInventory(inventoryResponse.data);

      const inventoryItemResponse = await axios.get("/api/inventory_items");
      setInventoryItems(inventoryItemResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        locations: locations || [],
        setLocations,
        businesses: businesses || [],
        setBusinesses,
        category: category || [],
        setCategory,
        products: products || [],
        setProducts,
        inventory: inventory || [],
        setInventory,
        inventoryItems: inventoryItems || [],
        setInventoryItems,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
