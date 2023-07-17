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
  Table,

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
                    <CardHeader className='custom-card-header'>{location.business_name}</CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardText>Address: {location.address}</CardText>
                    <CardText>
                      <Table>
                        <thead>
                          <tr>
                            <th>Latest Inventories</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Button>View</Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardText>
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
            <Col>
              <Card
                className="my-2"
                color="primary"
                outline
                style={{
                  width: '18rem',
                  height: '12rem',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                }}
              >
                <CardBody
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Button color='primary' size="lg" onClick={() => showModal()}>Add Location</Button>
                </CardBody>
              </Card>
            </Col>
        </Row>
      </Container>
      {modal ? (
        <LocationModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
      ) : null}
    </main>
  );
}
