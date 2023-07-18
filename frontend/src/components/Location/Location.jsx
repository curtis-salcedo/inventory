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

import './Location.css'

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
      <Container className='location-container'>
          {locations ? (
            locations.map((location, index) => (
              <Card
                key={index}
                className="location-card"
                color="primary"
                outline
              >
                <CardBody>
                  <CardHeader className='custom-card-header'>{location.business_name}</CardHeader>
                  <CardTitle>{location.name}</CardTitle>
                  <CardBody>
                  <CardText>Address: {location.address}</CardText>
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
                  </CardBody>
                  <CardFooter className='custom-card-footer'>
                    <Button>More</Button>
                  </CardFooter>
                </CardBody>
              </Card>
            ))
            

            ) : (
            <div>Loading...</div>
            )}
            <Button className='location-add-button' color='success' size="lg" onClick={() => showModal()}>Add Location</Button>
      </Container>
      {modal ? (
        <LocationModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
      ) : null}
    </main>
  );
}
