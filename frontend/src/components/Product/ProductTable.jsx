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
  // Sort State
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshList = () => {
    axios
      .get("/api/products/")
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setShowAddProductModal(!showAddProductModal);
  };

  const fetchProducts = () => {
    axios
      .get('/api/get_products/')
      .then((res) => { setProducts(res.data) })
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
    toggle();
    if (product.product_id) {
      axios
        .put(`/api/products/${product.product_id}/`, product)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("/api/create_product/", product)
      .then((res) => refreshList());
  };

  const handleSort = (column) => {
    console.log(column)
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProducts = products.sort((a, b) => {
    if (a[sortedColumn] < b[sortedColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortedColumn] > b[sortedColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

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
    refreshList();
  };
    
  return (
    <>
      <Button color="primary" size="lg" onClick={handleCreateProduct}>Add Product</Button>
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('sub_category')}>Sub-Category</th>
            <th onClick={() => handleSort('price')}>Price</th>
            <th onClick={() => handleSort('case_size')}>Case Size</th>
            <th onClick={() => handleSort('count_by')}>Count By</th>
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