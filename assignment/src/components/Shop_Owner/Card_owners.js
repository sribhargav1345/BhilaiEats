import React, { useState, useEffect, useRef } from 'react';
import { UseParams } from 'react-router-dom';

import './Card_owners.css';

export default function Card(props) {
  
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const options = props.options || [];

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  let finalPrice = 0;
  if (options.length > 0) {
    finalPrice = parseInt(options.find(option => option.size === size)?.price || options[0].price);
  }

  const handleRemove = async() => {
    props.handleRemoveItem(props.cardId);
  }

  return (
    <div>
      <div className="card mt-3 rounded" style={{ width: '20rem', maxHeight: '360px', borderRadius: '50px' }}>
        <img src={props.ImgSrc} className="card-img-top" alt="Not visible" style={{ height: '180px', objectFit: 'fill' }} />
        <div className="card-body3">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container2 w-100 mt-1">
            <select ref={priceRef} className="m-1 h-100 bg-rgb(241, 245, 249) rounded p-1" value={size} onChange={handleSizeChange}>
              {options.map((option, index) => (
                <option key={index} value={option.size}>
                  {option.size}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-6 m-2"> Rs.{finalPrice} /- </div>
            <hr/>
            <button className="btn btn-danger justify-center m-1" style={{marginTop: 'none'}} onClick={handleRemove}>Remove this item</button>
          </div>
        </div>
      </div>
    </div>
  );
}
