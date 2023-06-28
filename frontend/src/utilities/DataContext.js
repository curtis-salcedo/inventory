import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [locations, setLocations] = useState([]);
  const [business, setBusiness] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [productMix, setProductMix] = useState([]);
  const [user, setUser] = useState(null);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const locationResponse = await axios.get("/api/location");
      setLocations(locationResponse.data);

      const businessResponse = await axios.get("/api/business");
      setBusiness(businessResponse.data);

      const productResponse = await axios.get("/api/products");
      setProducts(productResponse.data);

      const categoryResponse = await axios.get("/api/category");
      setCategory(categoryResponse.data);

      const inventoryResponse = await axios.get("/api/inventory");
      setInventory(inventoryResponse.data);

      const inventoryItemResponse = await axios.get("/api/inventory_items");
      setInventoryItems(inventoryItemResponse.data);

      const productMixResponse = await axios.get("/api/product_mix");
      setProductMix(productMixResponse.data);

      const userResponse = await axios.get("/api/user");
      console.log(user)
      setUser(userResponse.data);

      const subCategoryResponse = await axios.get("/api/sub_category");
      setSubCategory(subCategoryResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        locations: locations || [],
        setLocations,
        business: business || [],
        setBusiness,
        category: category || [],
        setCategory,
        products: products || [],
        setProducts,
        inventory: inventory || [],
        setInventory,
        inventoryItems: inventoryItems || [],
        setInventoryItems,
        productMix: productMix || [],
        setProductMix,
        user: user || [],
        setUser,
        subCategory: subCategory || [],
        setSubCategory,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
