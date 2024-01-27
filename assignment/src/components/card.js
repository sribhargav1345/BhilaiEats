import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  const dispatch = useDispatchCart();
  const data = useCart();
  const navigate = useNavigate();
  const priceRef = useRef();

  const options = props.options || {};
  const priceOptions = Object.keys(options);

  useEffect(() => {
    setFinalPrice(qty * parseInt(options[size] || 0));
  }, [qty, size, options]);

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!props.foodItem) {
      console.error('Food item is not defined');
      return;
    }

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const foodItem = props.foodItem;

    let food = data.find((item) => item.id === foodItem._id);
    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({ type: 'ADD', id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: 'ADD', id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: '20rem', maxHeight: '50px' }}>
        <img src={props.foodItem?.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem?.name}</h5>
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
            <div className="d-inline h-100 fs-6">Rs.{finalPrice} /-</div>
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
