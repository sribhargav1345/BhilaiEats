import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card_shop(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`/shop/${props.shop_id}`}
      className="text-decoration-none text-dark"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="container d-flex rounded"
        style={{
          boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="card mt-3" style={{ width: '20rem', maxHeight: '50rem', borderRadius: '10px', overflow: 'hidden' }}>
          <img src={props.ImgSrc} className="card-img-top" alt="Shop" style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold text-yellow">{props.shopName}</h5>
            <p className="card-text text-success">{props.description}</p>
            <hr />
          </div>
        </div>
      </div>
    </Link>
  );
}
