import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getUser } from "./users-api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [locations, setLocations] = useState([]);
  const [business, setBusiness] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [productMix, setProductMix] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const user = await getUser();
      setUser(user);

      const locationResponse = await axios.get("/api/locations");
      setLocations(locationResponse.data);

      const businessResponse = await axios.get("/api/businesses");
      setBusiness(businessResponse.data);

      const productResponse = await axios.get("/api/products");
      setProducts(productResponse.data);

      const categoryResponse = await axios.get("/api/categories");
      setCategory(categoryResponse.data);

      const inventoryResponse = await axios.get("/api/inventories");
      setInventory(inventoryResponse.data);

      const inventoryItemResponse = await axios.get("/api/inventory_items");
      setInventoryItems(inventoryItemResponse.data);

      const productMixResponse = await axios.get("/api/product_mix");
      setProductMix(productMixResponse.data);

      const subCategoryResponse = await axios.get("/api/sub_categories");
      setSubCategory(subCategoryResponse.data);
    } catch (err) {
      // console.log(err);
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
        products: [ ...products, products.number] || [],
        setProducts,
        inventory: inventory || [],
        setInventory,
        inventoryItems: inventoryItems || [],
        setInventoryItems,
        productMix: productMix || [],
        setProductMix,
        subCategory: subCategory || [],
        setSubCategory,
        user: user || null,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
