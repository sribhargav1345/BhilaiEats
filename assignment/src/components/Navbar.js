import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Model';
import { useCart } from '../components/ContextReducer';
import './Navbarr.css';
import Cart from '../screens/cart';


export default function Navbar() {

  const [cartView, setCartView] = useState(false);                                    // State to control visibility of cart model
  let data = useCart();                                                               // Custom hook named UseCart
  const navigate = useNavigate();                                                     // React Router for Navigation

  const handleLogout = () => {                                                        // If they press Logout, remove the authToken from localStorage, and navigate to home page.
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-orange">                {/* Navbar with responsive class, and green in color of bg, text color dark */}

        <div className="container-fluid">                                             { /* Bootstrap class for full-width container */}

          <img src="https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg?w=740&t=st=1706353061~exp=1706353661~hmac=49b276b5e98074b203d820eeafbb4e2ac9002b7506621881acc9ac5ae6202c0c" alt="." className="navbar-logo" />          {/* Add your image here */}

          <Link className="navbar-brand fs-2 fst-italic mx-3" to="/">                      { /* Link of GoodFood in font-size 1 and font of italic, and navigated to '/' page */}
            GoodFood
          </Link>

          <button                                                                      /* This button is for toggling. It represents a Bootstrap button that toggles the collapse of a navbar on smaller screens*/
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">        {/* navbar-collapse is a Bootstrap class that styles the navbar's content for collapse behavior. */}

            <ul className="navbar-nav me-auto mb-2 ml-2">                               {/* navbar-nav => navbar navigation, me-auto: alignes items to the right, mb-2: margin of 2, specifically, gap between navbar elements is 2 */}

              {localStorage.getItem('authToken') ? (                                    /* If the account is Logged In, write My orders and Logout option on navbar */

                <div className="d-flex">

                  <Link className="nav-link active fs-5 btn bg-white text-success mb-1 mr-5 me-auto" style={{marginRight:"30px"}} aria-current="page" to="/myOrder">
                    My Orders
                  </Link>

                  <div className="btn bg-white text-danger mb-1 me-auto" onClick={handleLogout}>
                    Logout
                  </div>

                </div>

              ) : ('')}

              {!localStorage.getItem('authToken') ? (                                   /* If the account is not logged in, write options of Login, SignUp and MyCart there */

                <div className="d-flex ml-auto">

                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>

                  <Link className="btn bg-white text-success mx-1" to="/signup">
                    Sign Up
                  </Link>

                </div>

              ) : ('')}
              
            </ul>

            <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>
              My Cart
              <Badge pill bg="danger"> {data.length} </Badge>
            </div>

            {cartView ? <Modal onClose={() => setCartView(false)}> </Modal> : null}

          </div>
        </div>
      </nav>
    </div>
  );
}
