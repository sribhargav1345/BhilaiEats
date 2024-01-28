import React, { useState } from 'react';
import './Navbarr.css';

export default function Carousel() {
    const [search, setSearch] = useState('');

    const handleSearch = () => {                                                        // If they press Logout, remove the authToken from localStorage, and navigate to home page.
        return;
    };

    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

                <div className="carousel-inner" id='carousel'>

                    <div className="carousel-caption" style={{ zIndex: "4", top: "60%", left: "05%", transform: "translateY(-50%)" }}>
                        <div className='textcarousel' style={{ textAlign: "left",fontStyle: "Italic", fontSize: "40px" }}>
                            <p>Food Delivery at IIT Bhilai</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <input className="form-control me-2 bg-white text-dark" style={{ width: "380px", height: "40px" }} type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-orange" type="button" onClick={() => handleSearch()}>Search</button>
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://lyphe.com/app/uploads/2023/10/Image-1-cannabis-muffins.jpeg" className="d-block w-100" style={{ width: "500px", height: "660px", filter: "brightness(90%)" }} alt="Burger" />
                    </div>
                </div>
            </div>
        </div>


    );
}
