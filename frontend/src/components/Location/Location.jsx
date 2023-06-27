import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports

// Styling Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Col,
  CardFooter,
  Button,
  Row,
  Title
} from 'reactstrap';

export default function Location() {
  const { locations, business, setLocations } = useContext(DataContext);

  return ( 
    <main>
      <h1>Locations</h1>
      <Row>

        {locations ? (
          locations.map((location, index) => (
            <Col md={3} key={index}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{location.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                  </CardSubtitle>
                  <CardText>{location.address}</CardText>
                  <CardFooter>
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
    </main>
  );
}
