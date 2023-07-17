import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports

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

export default function LocationCardContainer() {
  const { inventory, locations } = useContext(DataContext);


  const handleView = (e, id) => {
    console.log('This handleView at LocationCardContainer is disabled', e, id)
  }


    // Convert Month to long form
    function getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return date.toLocaleString('en-US', { month: 'long' });
    }

  return (
    <div>
      <Container>
      <Row className="custom-card-container">
          { inventory && (
            inventory.map((i) => (
        <Col key={i.inventory_id} md={3}>
            <Card 
              className="my-2"
              color="primary"
              outline
              style={{
                width: '18rem',
                height: '10rem'
              }}
            >
              <CardBody>
                <CardHeader className='custom-card-header' tag="h5">{i.name.slice(0, -5)}</CardHeader>
                <CardTitle tag="h5">{getMonthName(i.month, i.year)}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2"></CardSubtitle>
                <CardFooter className="custom-card-footer">
                  <Button>Edit</Button>
                  <Button color='primary' onClick={(e) => handleView(e, i.inventory_id)}>View</Button>
                </CardFooter>
            </CardBody>
          </Card>
        </Col>
            ))
            )
          }
      </Row>
    </Container>
  </div>
  )
}