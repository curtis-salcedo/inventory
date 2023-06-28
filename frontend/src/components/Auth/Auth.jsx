import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/protected_endpoint/');
        setData(response.data);
      } catch (error) {
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Welcome, {data.username}!</h1>
          {/* Display other protected data */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProtectedComponent;
