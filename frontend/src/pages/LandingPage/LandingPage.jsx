import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports

// Styling Imports
import { 
  Container,
  Button,
} from 'reactstrap';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function LandingPage() {
  const { user, business } = useContext(DataContext);
  const [ userBusiness, setUserBusiness ] = useState(null);

  useEffect(() => {
    if (user) {
      setUserBusiness(business);
    }
  }, [user]);

  return (
    <main>
      <Container>

      { userBusiness ? 
        <div className='landing-container'>
          <h1>{business.name}</h1>
          <h2>{user.email}</h2>
          <p>Thank you for using Inventory Buddy. Please click the button below to start counting inventory.</p>
          <Link to='/inventory'>
            <Button size='lg' color='primary'>Start Counting!</Button>
          </Link>
        </div>
      : 
      <div>
          <p>Thank you for using Inventory Buddy. It looks like you're not associated with an account that is connected to an enterprise account. If there is an error, please try refreshing the page or contact your account administrator.</p>
        </div>
      }
      </Container>

    </main>
  );
};
