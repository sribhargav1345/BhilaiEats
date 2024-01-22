import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import Carousel from '../components/carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {

  const [foodCat, setFoodCat] = useState([])      // Input is given as array, for using map if possible
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json()
    //console.log(response[0],response[1]);
    // setFoodItems(response[0])
    // setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel/>
      </div>
      <div className='m-3'> 
        <Card/>
        <Card/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
  }
