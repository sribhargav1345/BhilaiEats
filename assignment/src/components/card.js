import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState('');
  const [initialSizeSet, setInitialSizeSet] = useState(false); // New state to track if initial size is set

  const dispatch = useDispatchCart();
  const data = useCart();
  const navigate = useNavigate();
  const priceRef = useRef();
  const options = props.options || {};
  const priceOptions = Object.keys(options);

  useEffect(() => {
    if (priceRef.current && !initialSizeSet) {
      setSize(priceRef.current.value);
      setInitialSizeSet(true);
    }
  }, [initialSizeSet]); // useEffect will run only once when initialSizeSet changes

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
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

    console.log("Adding to cart...");
    const foods = props.foodName;
    let food = [];

    for (const item of data) {
      if (item.id === foods._id) {
        food = item;
        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: foods._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: 'ADD', id: foods._id, name: foods.name, price: finalPrice, qty: qty, size: size });
        return;
      }
    } else {
      await dispatch({ type: 'ADD', id: foods._id, name: foods.name, price: finalPrice, qty: qty, size: size });
    }
  };

  const finalPrice = qty * parseInt(options[size] || 0);

  return (
    <div>
      <div className="card mt-3 rounded" style={{ width: '20rem', maxHeight: '50rem',borderRadius: '50px' }}>
        <img src={props.ImgSrc} className="card-img-top" alt="Not visible" style={{ height: '180px', objectFit: 'fill'  }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <button className="m-2 h-50 bg-success rounded" style={{ height: '5px', width: '20px' }} onClick={decreaseQty}>-</button>
            <div className="d-inline h-100 fs-6">{qty}</div>
            <button className="m-2 h-50 bg-success rounded = True" onClick={increaseQty}>+</button>
            <select ref={priceRef} className="m-2 h-100 bg-success rounded = True" value={size} onChange={handleSizeChange}>
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
