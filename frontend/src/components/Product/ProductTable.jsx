import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import ProductModal from './ProductModal'
import AddProductModal from '../AddProduct/AddProductModal';

// Styling Imports
import {
  Table,
  Button,
} from 'reactstrap';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('/api/get_products/')
      .then((res) => {
        console.log(res.data)
        setProducts(res.data)
      })
      .catch((err) => console.log(err));
  };

  const showProductDetails = (e, product) => {
    console.log(product)
    handleProductModal(product);
    setShowProductModal(!showProductModal);
  };

  
  const handleProductModal = (product) => {
    setActiveProduct(product);
    setShowProductModal(!showProductModal);
  };

  const handleAddProductModal = (product) => {
    setActiveProduct(product);
    setShowAddProductModal(!showAddProductModal);
  };

  const handleSubmit = (product) => {

  };

  const handleSort = (column) => {
    console.log(column)
  };

  const handleCreateProduct = () => {
    const newProduct = {
      product_id: '',
      product_number: '',
      name: '',
      category: '',
      sub_category: '',
      price: '',
      case_size: '',
      count_by: '',
      description: '',
    }
    setActiveProduct(newProduct);
    setShowAddProductModal(!showAddProductModal);
  };
    
  return (
    <>
      <Button color="primary" size="lg" onClick={handleCreateProduct}>Add Product</Button>
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('name')} >Name</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Price</th>
            <th>Case Size</th>
            <th>Count By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((p) => (
              <tr scope="row" key={p.product_id}>
                <td>{p.product_number}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.sub_category || 'None'}</td>
                <td>$ {p.price}</td>
                <td>{p.case_size}</td>
                <td>{p.count_by}</td>
                <td>
                  <Button onClick={(e) => showProductDetails(e, p)} size="sm" color="primary">
                    Details
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No products found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {showProductModal && (
        <ProductModal
          activeProduct={activeProduct}
          toggle={handleProductModal}
          onSave={handleSubmit}
        />
      )}
      {showAddProductModal && (
        <AddProductModal
          activeItem={activeProduct}
          toggle={handleAddProductModal}
          onSave={handleSubmit}
        />
      )}
    </>
  );
};