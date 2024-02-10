import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card_shop from '../../components/Super_Admin/card_shop';
import Carousel from '../../components/User/carousel';
import Footer from '../../components/User/Footer';
import Navbar from '../../components/User/Navbar';
import './Home.css';
import './Shops/Shops.css';
import AddItemForm from './Add_shop';

export default function Home_SuperAdmin() {
  const [search, setSearch] = useState('');
  const [shops, setShops] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const loadData = async () => {

    try {
      const response = await fetch('http://localhost:5000/api/shopData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setShops(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
  };

  const handleAddItemClick = () => {
    window.location.href = '/superadmin/Add_shops';
  };

  return (
    <div className="coloring">

      <Navbar />
      <Carousel onSearchChange={handleSearchChange} />

      <div className="container" style={{ marginTop: '30px' }}>

        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold mt-6 mb-6">Restaurants</h2>
            <hr className="my-2" />
          </div>
        </div>

        {shops.length !== 0 ? (
          <div className="row">
            {shops
              .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
              .map((filterItem) => (
                <div key={filterItem._id} className="col-12 col-md-6 col-lg-4 mt-3">

                  <Link to={`/shop/${filterItem._id}`} className="link">

                    <Card_shop
                      shopName={filterItem.name}
                      shop_id={filterItem._id}
                      ImgSrc={filterItem.image}
                      description={filterItem.description}
                    />

                  </Link>

                </div>
              ))}
          </div>
        ) : (
          <div>"No such data found"</div>
        )}
      </div>
      <div className="add-item-form-container">
        {/* Clicking on the '+' button will redirect to the Add_item page */}
        <div className="add-button" title="Add Restaurant" onClick={handleAddItemClick}>
          +
        </div>
      </div>
      <Footer />
    </div>
  );
}
