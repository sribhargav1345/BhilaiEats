import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import Carousel from '../components/carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// In Home page, we will be displaying Card, Carousel, Footer, Navbar

export default function Home() {

  const [search,setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([])      // Input is given as array, for using map if possible
  const [foodItem, setFoodItems] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    //console.log(response[0],response[1]);
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div >

      <div> <Navbar /> </div>
      <div> <Carousel/> </div>

      <div className='container'>
      {
        foodCat.length !== 0
          ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>    {/* This className of row-mb-3 and col-12, col-md-6 and these all are taken from bootstrap grid system */}
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                {/* Displays the category name of the food on each card */}
                <hr />
                {foodItem.length !== 0
                  ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItems = {filterItems}>
                              options = {filterItems.options[0]}
                          </Card>
                        </div>
                      )
                    })
                  : <div>"No such data found"</div>
                }
              </div>
            )
          })
          : <div>Hello is tag hiof</div>
        }
      </div>
      <div> <Footer /> </div>

    </div>
  )
}