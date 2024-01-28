import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbarr from './Navbar';

export default function Card_shop(props) {
    console.log('Props:', props);

    const navigate = useNavigate();                             // For navigation

    const options = props.options || {};                        // Extracting options and price options from props
    const priceOptions = Object.keys(options);


    return (      // JSX rendering
        <Link to={`/shop/${props.shop_id}`} className="text-decoration-none text-dark">

            <div className='container d-flex'>

                <div className="card mt-3" style={{ width: '20rem', maxHeight: '50rem' }}>

                    <img src={props.ImgSrc} className="card-img-top" alt="Shop" style={{ height: '120px', objectFit: 'fill' }} />

                    <div className="card-body">

                        <h5 className="card-title font-weight-bold text-yellow">{props.shopName}</h5>
                        <p className="card-text text-success">{props.description}</p>

                        <hr />
                        {/* Add other components or details specific to the shop */}

                    </div>
                </div>
            </div>
        </Link>
    );
}