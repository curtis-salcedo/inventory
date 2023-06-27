import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CategoryModal from './CategoryModal'

// Styling Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Col,
  Container,
  CardFooter,
  Button,
  Row,
} from 'reactstrap';

export default function Category() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    category_id: '',
    business: 1,
    name: '',
    description: '',
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get('/api/category/')
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (category) => {
    toggle();
    if (category.category_id) {
      axios
        .put(`/api/category/${category.category_id}/`, category)
        .then((res) => refreshList());
      return;
    }
    axios.post('/api/category/', category).then((res) => refreshList());
  };

  const handleDelete = (category) => {
    axios.delete(`/api/category/${category.category_id}`).then((res) => refreshList());
  };

  const createCategory = () => {
    const category = {
      category_id: null,
      name: '',
      description: '',
      business: 1,
    };
    setActiveItem(category);
    setModal(!modal);
  };

  const editCategory = (category) => {
    setActiveItem(category);
    setModal(!modal);
  };

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const renderCategory = () => {
    return categoryList.map((c) => (
      <li key={c.category_id}>
        <span>{c.name}</span>
        <span>{c.description}</span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => editCategory(c)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(c)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (



    <main className="container">
      <Container>
        <Row>
          <Col md={6}>
            { categoryList && (
              categoryList.map((c) => (
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{c.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{c.description}</CardSubtitle>
                  <CardText>Some Text to go here</CardText>
                  <CardFooter>
                    <Button onClick={() => editCategory(c)}>Edit</Button>
                    <Button>View Products in Category</Button>
                  </CardFooter>
              </CardBody>
            </Card>
              ))
              )
            }
          </Col>
        </Row>
      </Container>
      {modal ? (
        <CategoryModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
      ) : null}
    </main>
  );
}