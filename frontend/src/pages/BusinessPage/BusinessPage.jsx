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
  const [business, setBusiness] = useState([]);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeLocation, setActiveLocation] = useState('');
  const [activeProductMix, setActiveProductMix] = useState('');
  const [showMix, setShowMix] = useState(false);
  const [activeMix, setActiveMix] = useState({
    location_id: '',
    name: '',
    description: '',
  });
  
  // Data Imports
  const { locations, productMix } = useContext(DataContext);


  const toggle = () => {
    setShowModal(!showModal);
  }

  const toggleMix = (e) => {
    setShowMix(!showMix);
    setActiveProductMix(e);
  }
  
  const getBusinessInfo = async () => {
    axios
      .get("/api/business/")
      .then((res) => {
        setBusiness(res.data)
      })
      .catch((err) => console.log(err));
  };

  const getUserName = async () => {
    axios
      .get("/api/user/")
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (mix) => {
    console.log(mix);
    toggle();
    if (mix.product_mix_template_id) {
      axios
        .put(`/api/product_mix/${mix.product_mix_template_id}/`, mix)
        .then((res) => updateProductMix(res.data))
        .catch((err) => console.log(err));
    } else {
      console.log('Product Mix Post', mix);
      axios
        .post("/api/create_product_mix/", mix)
        .then((res) => createProductMix(res.data))
        .catch((err) => console.log(err));
    }
  };

  const createProductMix = (product_mix) => {
    setBusiness([...business, product_mix]);
  };

  const updateProductMix = (product_mix) => {
    console.log('updating product mix', product_mix);
  };

  useEffect(() => {
    setActiveMix(productMix)
    getBusinessInfo();
    getUserName();
  }, [activeMix]);

  console.log(activeMix)

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
        {/* {user.map((u) => (
          <div key={u.user_id}>
            <div>Users: {u.username}</div>
          </div>
        ))} */}
      </div>
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
        {/* <div>Product Mixes Made:</div>
        { productMix ?
          productMix.map((p) => (
            <div key={p.product_mix_template_id}>
            <button value={p.product_mix_template_id} onClick={(e) => toggleMix(p.product_mix_template_id)}>{p.name} {p.location_id}</button>
            </div>
            ))
        : null}
        { showMix ?
          <ProductMix
          activeLocation={activeLocation}
          activeProductMix={activeProductMix}
          toggleMix={toggleMix}
          />
        : null} */}
    </main>
  );
};
