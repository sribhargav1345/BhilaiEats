import React, { useEffect, useState } from 'react';
import Card from '../components/card';
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
    <div>
      <Navbar />
      <Carousel />
      <div className='container'>
        {shops.length !== 0 ? (
          shops
            .filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()))
            .map(filterItem => (
              <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                <Card
                  foodName={filterItem.name}
                  foodItem={filterItem}
                  ImgSrc={filterItem.image}
                  options={filterItem.options[0]}
                />
              </div>
            ))
        ) : (
          <div>"No such data found"</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
