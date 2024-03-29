import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

import './card.css';

export default function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [initialSizeSet, setInitialSizeSet] = useState(false); // New state to track if initial size is set

  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options || {};

  useEffect(() => {
    if (priceRef.current && !initialSizeSet) {
      setSize(priceRef.current.value);
      setInitialSizeSet(true);
    }
  }, [initialSizeSet]); // useEffect will run only once when initialSizeSet changes

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  function increaseQty() {
    setQty(qty + 1);
  }

  function decreaseQty() {
    if (qty === 0) {
      return;
    } else {
      setQty(qty - 1);
    }
  }

  const handleAddToCart = async () => {
    const foods = props.foodName;
    console.log(foods);
    console.log(foods);
    let food = [];

    for (const item of data) {
      if (item.id === props._id) {
        food = item;
        break;
      }
    }
    console.log(food);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: 'ADD', id: props._id, name: props.foodName, price: finalPrice, qty: qty, size: size });
        return;
      }
    } else {
      await dispatch({ type: 'ADD', id: props._id, name: props.foodName, price: finalPrice, qty: qty, size: size });
    }
    await dispatch({ type: "ADD", id: props._id, name: props.foodName, price: props.finalPrice, qty: qty, size: size});
    await console.log(data);
  };

  let finalPrice = 0;
  if (options.length > 0) {
    finalPrice = qty * parseInt(options.find(option => option.size === size)?.price || options[0].price);
  }

  return (
    <div>
      <div className="card mt-3 rounded" style={{ width: '20rem', maxHeight: '360px' ,borderRadius: '50px' }}>
        <img src={props.ImgSrc} className="card-img-top" alt="Not visible" style={{ height: '180px', objectFit: 'fill'  }} />
        <div className="card-body6">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <button className="h-50 bg-success rounded" style={{ height: '5px', width: '20px' }} onClick={decreaseQty}>-</button>
              <div className="m-2 d-inline h-100 fs-6">{qty}</div>
              <button className="mr-4 h-50 bg-success rounded" style={{ width: "20px",marginRight: '7px' }} onClick={increaseQty}>+</button>

            <select ref={priceRef} className="m-2 h-100 bg-rgb(241, 245, 249) rounded" style={{width:"80px"}} value={size} onChange={handleSizeChange}>
              {options.map((option, index) => (
                <option key={index} value={option.size}>
                  {option.size}
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