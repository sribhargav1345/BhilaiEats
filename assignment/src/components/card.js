import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

  const [qty, setQty] = useState(1);                          // State variables for quantity,size and final price
  const [size, setSize] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  const dispatch = useDispatchCart();                         // Dispatch function and cart data from context
  const data = useCart();


  const navigate = useNavigate();                             // For navigation
  const priceRef = useRef();

  const options = props.options || {};                        // Extracting options and price options from props
  const priceOptions = Object.keys(options);

  useEffect(() => {                                           // Effect to update final prize when quantity or size changes
    setFinalPrice(qty * parseInt(options[size] || 0));
  }, [qty, size, options]);

  const handleQtyChange = (e) => {                            // Event Handler for quantity change
    setQty(parseInt(e.target.value));
  };

  const handleSizeChange = (e) => {                           // Event Handler for size change
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!props.foods) {                                         // Checking if Fooditem is defined
      console.error('Food item is not defined');
      return;
    }

    if (!localStorage.getItem('token')) {                     // Check if user is authenticated (logged in)
      navigate('/login');                                     // If not navigate to login page
      return;
    }

    const foods = props.foods;                                // Extract foodItem from props for easier access
    console.log(props.foods);

    let food = data.find((item) => item.id === foods._id);    // If food item aldready exists in cart based on ID

    if (food) {                                               // If food is aldready in cart

      if (food.size === size) {                               // If half == half
        await dispatch({ type: 'UPDATE', id: foods._id, price: finalPrice, qty: qty });
      } 

      else {
        await dispatch({ type: 'ADD', id: foods._id, name: foods.name, price: finalPrice, qty: qty, size: size });
      }

    } 

    else {                                                    // If food item is not in cart add new one
      await dispatch({ type: 'ADD', id: foods._id, name: foods.name, price: finalPrice, qty: qty, size: size });
    }

  };

  return (      // JSX rendering
    <div>

      <div className="card mt-3" style={{ width: '20rem', maxHeight: '50rem' }}>

        <img src={props.ImgSrc} className="card-img-top" alt="Not visible" style={{ height: '120px', objectFit: 'fill' }} />

        <div className="card-body">

          <h5 className="card-title">{props.foodName}</h5>

          <div className="container w-100">

            <select className="m-2 h-100 bg-success" value={qty} onChange={handleQtyChange}>

              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}

            </select>

            <select className="m-2 h-100 bg-success rounded=True" value={size} onChange={handleSizeChange}>

              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}

            </select>

            <div className="d-inline h-100 fs-6"> Rs.{finalPrice} /- </div>

            <div>

              <hr />

              <button className="btn btn-success justify-center ms-2 " onClick={handleAddToCart}>
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
