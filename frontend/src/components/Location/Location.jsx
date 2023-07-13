import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import LocationModal from './LocationModal'

// Styling Imports
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Col,
  CardFooter,
  Button,
  Row,
  Container,
} from 'reactstrap';

import '../Components.css'

export default function Location() {
  const { locations, business, setLocations, user } = useContext(DataContext);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    business: business,
    name: '',
    address: '',
  });

  useEffect(() => {
    refreshList();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (location) => {
    toggle();
    if (location.id) {
      axios
        .put(`/api/locations/${location.id}/`, location)
        .then((res) => refreshList());
      return;
    }
    axios
      .post('/api/locations/', location)
      .then((res) => refreshList());
  };

  const refreshList = () => {
    axios
      .get('/api/locations/')
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (location) => {
    axios
      .delete(`/api/locations/${location.id}`)
      .then((res) => refreshList());
  };

  const handleCreate = () => {
    const location = {
      business: business.id,
      name: '',
      address: '',
    };
    setActiveItem(location);
    setModal(!modal);
  };

  const handleEdit = (location) => {
    setActiveItem(location);
    setModal(!modal);
  };

  const showModal = () => {
    setActiveItem({
      business: business,
      name: '',
      address: '',
    });
    setModal(!modal);
  };

  return ( 
    <main>
      <Container>
        <Button onClick={() => showModal()}>Add Location</Button>
        <Row className="custom-card-container">
          {locations ? (
            locations.map((location, index) => (
              <Col md={3} key={index}>
                <Card
                  className="my-2"
                  color="primary"
                  outline
                  style={{
                    width: '18rem'
                  }}
                >
                  <CardBody>
                    <CardHeader className='custom-card-header'>{location.business}</CardHeader>
                    <CardTitle tag="h5">{location.name}</CardTitle>
                    <CardText>Address: {location.address}</CardText>
                    <CardFooter className='custom-card-footer'>
                      <Button>More</Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
            ))
            ) : (
            <div>Loading...</div>
            )}
        </Row>
      </Container>
      {modal ? (
        <LocationModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
      ) : null}
    </main>
  );
}
