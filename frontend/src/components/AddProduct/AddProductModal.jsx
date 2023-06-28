import React, { Component } from "react";
import axios from "axios";
import { DataContext } from "../../utilities/DataContext";

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
} from "reactstrap";

export default class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  componentDidMount = () => {
    this.fetchCategories();
    // this.fetchSubCategories();
  };

  fetchCategories = () => {
    axios
      .get("/api/category/")
      .then((res) => {
        console.log(res.data)
        this.setState({ categories: res.data });
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/sub_category/")
      .then((res) => {
        console.log(res.data)
        this.setState({ sub_categories: res.data });
      }
      )
      .catch((err) => console.log(err));

  };

  // fetchSubCategories = () => {
  //   axios
  //     .get("/api/sub_category/")
  //     .then((res) => {
  //       console.log('sub_category data', res.data)
  //       this.setState({ sub_categories: res.data });
  //     })
  //     .catch((err) => console.log(err));
  // };

  handleChange = (e) => {
    let { name, value } = e.target;
    console.log(e.target)
    const activeItem = { ...this.state.activeItem, [name]: value };
    console.log(activeItem)

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    const { categories, sub_categories } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add A Product</ModalHeader>
      <ModalBody>
        <Form>

          <FormGroup>
            <Label for="product-category">Product Category</Label>
            <Input type="select" id="category" name="category" onChange={this.handleChange} >
            <option value="">Select Category</option>
            {categories && categories.map((c) => {
              return (
                <option value={c.category_id} key={c.category_id}>{c.name}</option>
              )
            })}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="product-category">Product Sub-Category</Label>
            <Input type="select" id="sub_category" name="sub_category" onChange={this.handleChange} >
            <option value="">Select Category</option>
            {sub_categories && sub_categories.map((s) => {
              return (
                <option value={s.sub_category} key={s.sub_category_id}>{s.name}</option>
              )
            })}
            </Input>
          </FormGroup>
    
          <FormGroup>
            <Label for="product-name">Product Name</Label>
            <Input
              type="text"
              id="product-name"
              name="name"
              value={this.state.activeItem.name}
              onChange={this.handleChange}
              placeholder="Enter Product Name"
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="product-description">Description</Label>
            <Input
              type="text"
              id="product-description"
              name="description"
              value={this.state.activeItem.description}
              onChange={this.handleChange}
              placeholder="Enter the product description"
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="product-number">Product Number</Label>
            <Input
              type="text"
              id="product-number"
              name="product_number"
              value={this.state.activeItem.product_number}
              onChange={this.handleChange}
              placeholder="Enter the product number"
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="product-price">Price</Label>
            <Input
              type="number"
              id="product-price"
              name="price"
              value={this.state.activeItem.price}
              onChange={this.handleChange}
              placeholder="Enter the price"
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="product-case-size">Case Size</Label>
            <Input
              type="number"
              id="product-case-size"
              name="case_size"
              value={this.state.activeItem.case_size}
              onChange={this.handleChange}
              placeholder="Enter the case size"
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="product-count-by">Count By</Label>
            <Input
              type="text"
              id="product-count-by"
              name="count_by"
              value={this.state.activeItem.count_by}
              onChange={this.handleChange}
              placeholder="Enter the count by value"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(this.state.activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
    
    );
  }
}