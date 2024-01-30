import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './Shops.css';

export default function Milkshakes() {
  const [search, setSearch] = useState('');
  const [food_milkshakesCat, setFoodMilkshakesCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Milkshakesdata", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        setFoodItems(data[0]);
        setFoodMilkshakesCat(data[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="full-width-background"> {/* Add this wrapper div */}
      <Navbar />
      <div className='container'>
        <div className='row mb-5'>
          <div className='fs-3 mt-5'>About Shop</div>
          <hr />
          <div className='col-md-4'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJNMw-4NCYZfGMQl5SJhN2FZ35GWIsN8fj7rBG-yWVZw&s" alt="Shop" className="shop-image" />
          </div>
          <div className='col-md-8'>
            <h3 className="shop-name font-weight-bold">Milkshakes</h3>
            <p className="shop-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        </div>
        {food_milkshakesCat.length !== 0 ? (
          food_milkshakesCat.map((category) => (
            <div key={category._id} className='row mb-3'>
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem.filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItem) => (
                  <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodName={filterItem.name} ImgSrc={filterItem.img} options={filterItem.options[0]} foodItem={filterItem} />
                  </div>
                ))
              ) : (
                <div className='text-black'>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>You have done something wrong</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
