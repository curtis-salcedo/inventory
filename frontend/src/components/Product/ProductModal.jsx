import React, { Component } from "react";
import axios from "axios";
import { DataContext } from "../../utilities/DataContext";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class ProductModal extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      activeProduct: this.props.activeProduct,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    console.log(e.target)
    const activeProduct = { ...this.state.activeProduct, [name]: value };
    console.log(activeProduct)
    this.setState({ activeProduct });
  };

  render() {
    const { toggle } = this.props;

    return (
      <main>
        <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Info</ModalHeader>
        <ModalBody>
        <div>
          <p>Product Number: {this.state.activeProduct.number}</p>
          <p>Product Name: {this.state.activeProduct.name}</p>
          <p>Product Category: {this.state.activeProduct.category}</p>
          <p>Product Sub-Category: {this.state.activeProduct.sub_category}</p>
          <p>Product Description: {this.state.activeProduct.description}</p>
          <p>Price: {this.state.activeProduct.price}</p>
          <p>Case Size: {this.state.activeProduct.case_size}</p>
          <p>Count By: {this.state.activeProduct.count_by}</p>
          <p>Vendor: {this.state.activeProduct.vendor}</p>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      </main>
    );
  }
}