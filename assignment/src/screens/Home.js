import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import Card_shop from '../components/card_shop'
import Carousel from '../components/carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [search, setSearch] = useState('');
  const [shops, setShops] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/shopData", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setShops(data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: 'None' }}>
      <Navbar />
      <Carousel />
      <div className='container' style={{ marginTop: '30px' }}>
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold mt-6 mb-6">Restaurants</h2>
            <hr className="my-2" />
          </div>
        </div>
        {shops.length !== 0 ? (
          <div className="row">
            {shops
              .filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()))
              .map(filterItem => (
                <div key={filterItem._id} className='col-12 col-md-6 col-lg-4 mt-3'>
                  <Card_shop
                    shopName={filterItem.name}
                    shop_id={filterItem._id}
                    ImgSrc={filterItem.image}
                    description={filterItem.description}
                  />
                </div>
              ))
            }
          </div>
        ) : (
          <div>"No such data found"</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
