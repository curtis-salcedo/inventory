import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CategoryModal from './CategoryModal'

// Styling Imports
import './Category.css'
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
  const { user, business } = useContext(DataContext);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    category_id: '',
    business: business,
    name: '',
    description: '',
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get('/api/categories/')
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
        .put(`/api/categories/${category.category_id}/`, category)
        .then((res) => refreshList());
      return;
    }
    axios.post('/api/categories/', category).then((res) => refreshList());
  };

  const handleDelete = (category) => {
    axios.delete(`/api/categories/${category.category_id}`).then((res) => refreshList());
  };

  const handleCreate = () => {
    const category = {
      category_id: '',
      name: '',
      description: '',
      business: business,
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

  const showModal = () => {
    setModal(!modal);
  };

  return (
    <main>
      <Container className="category-container">
            { categoryList && (
              categoryList.map((c) => (
              <Card key={c.category_id} md={3} className='category-card'>
                <CardBody>
                  <CardTitle tag="h5">{c.name.toUpperCase()}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{c.description}</CardSubtitle>
                  <CardText>This is quick access to all the products that are from the {c.name.toUpperCase()} category</CardText>
                  <CardFooter style={{ backgroundColor:'white'}}>
                    <div className='category-card-button-group'>
                      <Button className='category-card-button' color='success' onClick={() => editCategory(c)}>Edit</Button>
                      {/* <Button color='success' >Products in Category</Button> */}
                    </div>
                  </CardFooter>
                </CardBody>
              </Card>
              ))
              )}
      {modal ? (
        <CategoryModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
        ) : 
        <Button className='category-add-button' color='success' size="lg" onClick={() => showModal()}>Add Category</Button>}
        </Container>
    </main>
  );
}