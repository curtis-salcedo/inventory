import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Styling Imports
import {
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap';

export default function ImportCSV() {
  const { business } = useContext(DataContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
  }, [file]);

  const handleChange = (e) => {
    setFile(e.target.files[0])
  };

  const handleSubmit = async (e, file) => {

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/data/import/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};

  return (
    <div>
      <Form>
        <FormGroup>
          <Input type="file" id="csvImport" accept="csv" onChange={handleChange} ></Input>
          <Button onClick={(e) => handleSubmit(e, file)}>Submit</Button>
        </FormGroup>
      </Form>
    </div>
  )
}