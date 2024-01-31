import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar3 from '../components/Navbar3';
import './Login.css';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", userType: "", contactNumber: "", shopname: "" });
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = "";
        if (credentials.userType === "user") {
            apiUrl = "http://localhost:5000/api/CreateUser";

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: credentials.name, 
                    email: credentials.email, 
                    password: credentials.password, 
                    userType: credentials.userType,
                })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Failed to create user. Please check your input and try again.");
            } else {
                alert("User created successfully!");
            }

        } else if (credentials.userType === "restaurant-admin") {
            apiUrl = "http://localhost:5000/api/CreateAdmin";

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: credentials.name, 
                    email: credentials.email, 
                    password: credentials.password, 
                    shopname: credentials.shopname,
                    contact: credentials.contactNumber
                })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Failed to create restaurant admin. Please check your input and try again.");
            } else {
                alert("Restaurant admin created successfully!");
            }
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });

        // Show additional fields if user selects "Restaurant Admin"
        if (name === "userType" && value === "restaurant-admin") {
            setShowAdditionalFields(true);
        } else {
            setShowAdditionalFields(false);
        }
    };

    return (
        <div className='login-container'>
            <Navbar3 />
            <div className='container'>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card" style={{ width: "500px" }}>
                            <div className="card-body">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <hr />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userType" className="form-label">User Type</label>
                                        <select className="form-control custom-select" name="userType" value={credentials.userType} onChange={onChange}>
                                            <option value="">Select</option>
                                            <option value="user">User</option>
                                            <option value="restaurant-admin">Restaurant Admin</option>
                                        </select>
                                    </div>
                                    {showAdditionalFields && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                                <input type="text" className="form-control" name='contactNumber' value={credentials.contactNumber} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="shopname" className="form-label">Shop Name</label>
                                                <input type="text" className="form-control" name='shopname' value={credentials.shopname} onChange={onChange} />
                                            </div>
                                        </>
                                    )}
                                    <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                    <p className="text-center mb-0">Already have an account? <Link to="../login">Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

