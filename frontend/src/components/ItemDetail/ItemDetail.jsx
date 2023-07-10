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

export default class ItemDetail extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      currentItem: this.props.currentItem,
      activeItem: this.props.activeItem,
      foundItem: {},
    };
  }

  componentDidMount = () => {
    this.handleFetchItem();
  };

  handleFetchItem = () => {
    axios
      .get(`api/inventory/items/${this.state.currentItem}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ foundItem: res.data });
      })
      .catch((err) => console.log(err));
      console.log(this.state)
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    console.log(activeItem)

    this.setState({ activeItem });
  };


  render() {
    const { toggle, setItemDetail } = this.props;
    const { foundItem } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Item Details</ModalHeader>
      <ModalBody>
        <Form>
          <div>{foundItem.name}</div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => setItemDetail(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
    
    );
  }
}