import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import Carousel from '../../components/carousel';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './ATMart.css';

export default function ATMart() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/shop/65b5f3329e3f22efa0aacbd2", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      setFoodItems(data[0]);
      setFoodCat(data[1]);
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

      <div className='container'>
        <div className='row mb-5'>
          <div className='fs-3 mt-5'>About Shop</div>
          <hr />
          {/* Shop details section */}
          <div className='col-md-4'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJNMw-4NCYZfGMQl5SJhN2FZ35GWIsN8fj7rBG-yWVZw&s" alt="Shop" className="shop-image" />
          </div>
          <div className='col-md-8'>
            <h3 className="shop-name font-weight-bold">AT Mart</h3>
            <p className="shop-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        </div>

        {/* Display food categories and items */}
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem.filter((item) => (
                  item.CategoryName === data.CategoryName && 
                  item.name.toLowerCase().includes(search.toLocaleLowerCase())
                )).map(filterItem => (
                  <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      foodName={filterItem.name}
                      foodItem={filterItem}
                      ImgSrc={filterItem.img}
                      options={filterItem.options[0]}
                    />
                  </div>
                ))
              ) : (
                <div>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>Something went wrong</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
