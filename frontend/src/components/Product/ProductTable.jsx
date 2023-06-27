import React, { Component } from 'react';
import axios from 'axios';

// Data Imports

// Component Imports
import AddProductModal from '../AddProduct/AddProductModal';

// Styling Imports
import {
  Table,
  Button,
} from 'reactstrap';

export default class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  
  componentDidMount = () => {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get('api/get_products')
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProduct = (product) => {

  }

  render() {
    const { toggle, onSave } = this.props;
    const { products } = this.state;

    return (
      <Table size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Price</th>
            <th>Case Size</th>
            <th>Count By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            { products ? products.map((p) => {
              return (
              <tr key={p.product_id}>
                <td>{p.product_number}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.sub_category || 'None'}</td>
                <td>$ {p.price}</td>
                <td>{p.case_size}</td>
                <td>{p.count_by}</td>
                <td>
                  <Button
                    onClick={() => this.editProduct(p)}
                    size="sm"
                  >Edit</Button>
                </td>
              </tr>
              )
            }) : null }
        </tbody>
      </Table>
    );
  }
}