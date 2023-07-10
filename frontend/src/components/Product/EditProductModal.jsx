import React, { Component } from "react";
import axios from "axios";
import { DataContext } from "../../utilities/DataContext";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  Label,
} from "reactstrap";

export default class ProductModal extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      activeProduct: this.props.activeProduct,
      handleEditProductModal: false,
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
          <InputGroup>
            <Label>Product Number: 
              <Input value={this.state.activeProduct.number} name="number" /> 
            </Label>
            <Label>Name: 
              <Input value={this.state.activeProduct.name} name="name"/>
            </Label>
            <Label>Category:
              <Input value={this.state.activeProduct.category} name="category"/>
            </Label>
            <Label>Sub-Category:
              <Input value={this.state.activeProduct.sub_category} name="sub_category"/>
            </Label>
            <Label>Description:
              <Input value={this.state.activeProduct.description} name="description"/>
            </Label>
            <Label>Price:
              <Input value={this.state.activeProduct.price} name="price"/>
            </Label>
            <Label>Case Size:
              <Input value={this.state.activeProduct.case_size} name="case_size"/>
            </Label>
            <Label>Count By:
              <Input value={this.state.activeProduct.count_by} name="count_by"/>
            </Label>
            <Label>Vendor:
              <Input value={this.state.activeProduct.vendor} name="vendor"/>
            </Label>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Save
          </Button>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      </main>
    );
  }
}