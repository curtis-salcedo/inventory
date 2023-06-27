import React, { Component } from "react";
import axios from "axios";

// Component Imports

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
} from "reactstrap";

export default class ProductInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    console.log(e.target)
    const activeItem = { ...this.state.activeItem, [name]: value };
    console.log(activeItem)
    this.setState({ activeItem });
  };

  render() {
    const { toggle } = this.props;

    return (
      <main>
        <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Info</ModalHeader>
        <ModalBody>
        <div>
          <p>Product ID: {this.state.activeItem.product_id}</p>
          <p>Product Category: {this.state.activeItem.category}</p>
          <p>Product Name: {this.state.activeItem.name}</p>
          <p>Product Description: {this.state.activeItem.description}</p>
          <p>Product Number: {this.state.activeItem.product_number}</p>
          <p>Vendor: {this.state.activeItem.vendor}</p>
          <p>Vendor Product Number: {this.state.activeItem.vendor_product_number}</p>
          <p>Price: {this.state.activeItem.price}</p>
          <p>Case Size: {this.state.activeItem.case_size}</p>
          <p>Count By: {this.state.activeItem.count_by}</p>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Close
          </Button>
          <Button color="danger" onClick={toggle}>
            Delete
          </Button>
          <Button color="primary" onClick={toggle}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
      </main>
    )
  }
}