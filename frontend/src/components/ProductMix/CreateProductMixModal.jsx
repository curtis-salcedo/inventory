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


export default class CreateProductMixModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMix: {
        location_id: '',
        name: '',
        description: '',
      }
    };
  }
  
  handleChange = (e) => {
    let { name, value } = e.target;
    const activeMix = { ...this.state.activeMix, [name]: value };
    console.log(activeMix)
    this.setState({ activeMix });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Category</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
          <Label for="location">Location</Label>
          <Input type="select" name="location_id" id="location_id" onChange={this.handleChange}>
            <option value="">Select a Location</option>
            {this.props.locations.map((l) => (
              <option key={l.location_id} value={l.location_id}>{l.name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange} />
        </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeMix)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}