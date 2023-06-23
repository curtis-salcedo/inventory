import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import CreateProductMixModal from '../../components/ProductMix/CreateProductMixModal';
import ProductMix from '../../components/ProductMix/ProductMix';
import InventorySheet from '../../components/InventorySheet/InventorySheet';

// Styling Imports

// Axios CSRF Token Setup
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


export default function BusinessPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeLocation, setActiveLocation] = useState('');
  const [showMix, setShowMix] = useState(false);
  
  // Data Imports
  const { locations, business } = useContext(DataContext);


  const toggle = () => {
    setShowModal(!showModal);
  }

  const toggleMix = (e) => {
    setShowMix(!showMix);
  }

  const handleSubmit = (mix) => {

  };

  useEffect(() => {

  }, []);


  return (
    <main>
      <div>
        <button onClick={toggle}>Create Product Mix</button>
        { showModal ? <CreateProductMixModal toggle={toggle} locations={locations}
        onSave={handleSubmit}/> : null
        }
      </div>
      <div>
        <div>Here is the easy to use inventory sheet</div>
        <InventorySheet activeLocation={activeLocation} setActiveLocation={setActiveLocation} />
      </div>
      {/* <div>Here is Business Info</div> */}
      <div>
        {/* <div>Business:
          {business.map((b) => (
            <div key={b.business_id}>
              <div> {b.name}</div>
            </div>
            ))}
        </div> */}
      </div>
      <div>
        {/* <div>Locations:</div>
        { locations ? 
          locations.map((l) => (
            <div key={l.id}> {l.name}</div>
          ))
        : null} */}
      </div>
    </main>
  );
};
