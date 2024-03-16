import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../../Model';
import { useCart } from '../User/ContextReducer';
import '../User/Navbarr.css';

import Logo from '../User/Logo.png';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
                <div className="container-fluid">
                    <img src={Logo} alt="." className="navbar-logo" />
                    <Link className="navbar-brand fs-2 fst-italic mx-3" to="/">
                        BhilaiEats
                    </Link>
                    <button
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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="ms-auto"> {/* Here's the change */}
                            <Link className="btn bg-white text-success mx-2" style={{ borderRadius: "10px" }} to="/signup">
                                Sign Up
                            </Link>
                        </div>
                        {cartView ? <Modal onClose={() => setCartView(false)}> </Modal> : null}
                    </div>
                </div>
            </nav>
        </div>
    );
}
