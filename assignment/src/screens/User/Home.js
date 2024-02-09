import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card_shop from '../../components/User/card_shop';
import Carousel from '../../components/User/carousel';
import Footer from '../../components/User/Footer';
import Navbar from '../../components/User/Navbar';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [shops, setShops] = useState([]);

  useEffect(() => {
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
    loadData();
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
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
                  <Card_shop
                    shopName={filterItem.name}
                    shop_id={filterItem._id}
                    ImgSrc={filterItem.image}
                    description={filterItem.description}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div>"No such data found"</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
