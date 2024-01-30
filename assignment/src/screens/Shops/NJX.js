import React, { useEffect, useState ,useRef} from 'react'
import Card from '../../components/card'
import Carousel from '../../components/carousel'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

// In Home page, we will be displaying Card, Carousel, Footer, Navbar

export default function NJX() {

  const [search,setSearch] = useState('');                                        // State variables for search input, food categories, and food items
  const [foodCat, setFoodCat] = useState([])      
  const [foodItem, setFoodItems] = useState([])

  const loadData = async () => {                                                  // Sending a POST request to fetch data from server.
    try {
      const response = await fetch("http://localhost:5000/api/shop/65b6616b25d1fac6691e3ad1", {
        method: 'GET',                                                           // HTTP req, is being made using POST method. -> used to submit data to server, for creating or updating resources on server.
        headers: {
          'Content-Type': 'application/json'                                      // To specify content is of type json format.
        }
      });
      const data = await response.json();                                         // This parses json encoded response body and stores it in data.
      
      setFoodItems(data[0]);                                                      // Set food items and categories based on fetched data
      setFoodCat(data[1]);
    } 
    
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {                                                               // When components mounts for 1st time, run this effect, only once.
    loadData()
  }, [])

  return (
    <div >

      <div> <Navbar /> </div>                                                     {/* Navbar at the top */}

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
      {
        (foodCat.length !== 0) ?
          foodCat.map((data) => {
            return (
              <div className='row mb-3'>                                                                                          {/* This className of row-mb-3 and col-12, col-md-6 and these all are taken from bootstrap grid system */}
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>                                                                                                            {/* Displays the category name of the food on each card */}
                                                                                                                                
                <hr />
                {foodItem.length !== 0
                  ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map(filterItem => {
                      return (
                        <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodName={filterItem.name} foodItem = {filterItem} ImgSrc={filterItem.img}
                              options = {filterItem.options[0]}
                          />
                        </div>
                      )
                    })
                  : <div>"No such data found"</div>
                }
              </div>
            )
          })
          : <div>" U have done something wrong "</div>
        }
      </div>

      <div> <Footer /> </div>                                                     {/* Footer at the End */}     

    </div>
  )
}