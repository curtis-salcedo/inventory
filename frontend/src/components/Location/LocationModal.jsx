import React, { Component } from "react";

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

export default class LocationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };
    console.log(activeItem)

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Location</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="category-name">Location Name</Label>
              <Input
                type="text"
                id="category-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Location Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="location_address">Description</Label>
              <Input
                type="text"
                id="location-address"
                name="address"
                value={this.state.activeItem.address}
                onChange={this.handleChange}
                placeholder="Location Address"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}