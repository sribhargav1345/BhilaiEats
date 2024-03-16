// Navbar for signup page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../User/Navbarr.css';

import Logo from '../User/Logo.png';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('shopname');
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
                <div className="container-fluid">
                    <img src={Logo} alt="." className="navbar-logo" />
                    <Link className="navbar-brand fs-2 fst-italic mx-3 me-auto" to="/">
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
                    <div className="ml-auto">
                        <Link className="btn bg-white text-success mx-2" style={{ borderRadius: "10px" }} to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
