import React, { useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../utilities/DataContext';

// axios CSRF token for Axios Requests
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function CreateBusiness() {
  const { user } = useContext(DataContext);

  
}
