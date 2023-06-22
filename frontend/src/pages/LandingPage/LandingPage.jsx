import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component Imports
import ProductInfoModal from '../../components/ProductInfo/ProductInfoModal';
import AddProductModal from '../../components/AddProduct/AddProductModal';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function InventoryCountPage() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [productList, setProductList] = useState([]);
  const [activeItem, setActiveItem] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [modal, setModal] = useState(false);
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get("/api/products/")
      .then((res) => setProductList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal);
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
      .post("/api/products/", product)
      .then((res) => refreshList());
  };

  const handleDelete = (product) => {
    axios
      .delete(`/api/products/${product.product_id}`)
      .then((res) => refreshList());
  };

  const createProduct = () => {
    const product = {
      category: "",
      name: "",
      description: "" ,
      product_number: "",
      price: "",
    }
    setActiveItem(product);
    setModal(!modal);
  };

  const editProduct = (product) => {
    setActiveItem(product);
    setModal(!modal);
  };

  // Handle the Product Info Modal display
  const handleToggleProductInfoModal = (product) => {
    setActiveItem(product);
    setShowProductInfoModal(!showProductInfoModal);
  }

  const renderProducts = () => {
    return productList.map((p) => (
      <li key={p.product_id}>
        <span>{p.name}</span>
        <span>{p.category}</span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editProduct(p)}
          >
            Edit
          </button>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => handleDelete(p)}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => handleToggleProductInfoModal(p)}
          >
            Product Info
          </button>
        </span>
        
      </li>
    ));
  };



  return (
    <main>
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body">
            <h2>Inventory Count Page</h2>
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createProduct}
              >
                Add Product
              </button>
            </div>

            <ul className="list-group">
              {renderProducts()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <AddProductModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Product Number</th>
            <th>Vendor</th>
            <th>Vendor Product Number</th>
            <th>Price</th>
            <th>Case Size</th>
            <th>Count By</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => (
            <tr key={p.product_id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>{p.product_number}</td>
              <td>{p.vendor}</td>
              <td>{p.vendor_product_number}</td>
              <td>{p.price}</td>
              <td>{p.case_size}</td>
              <td>{p.count_by}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showProductInfoModal && (
        <ProductInfoModal
          activeItem={activeItem}
          toggle={handleToggleProductInfoModal}
          onSave={handleSubmit}
        />
      )}

    </main>
  );
};
