import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar3 from '../components/Navbar3';
import './Login.css';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", userType: "" });
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = "";
        if (credentials.userType === "user") {
            apiUrl = "http://localhost:5000/api/CreateUser";     // API endpoint for user login

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
                alert("Enter Valid Credentials");
            }

        } else if (credentials.userType === "restaurant-admin") {
            apiUrl = "http://localhost:5000/api/CreateAdmin";        // API endpoint for admin login

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: credentials.name, 
                    email: credentials.email, 
                    password: credentials.password, 
                    contactNumber: credentials.contactNumber,           // Include contact number if present
                    shopName: credentials.shopName                      // Include shop name if present
                })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Enter Valid Credentials");
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
                                        <label htmlFor="name" className="form-label" style={{ borderRadius: "10px" }}>Name</label>
                                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} style={{ borderRadius: "10px" }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ borderRadius: "10px" }}>Email address</label>
                                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" style={{ borderRadius: "10px" }} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3" style={{ borderRadius: "10px" }}>
                                        <label htmlFor="exampleInputPassword1" className="form-label" style={{ borderRadius: "10px" }}>Password</label>
                                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" style={{ borderRadius: "10px" }} />
                                    </div>
                                    <div className="mb-3" style={{ borderRadius: "10px" }}>
                                        <label htmlFor="userType" className="form-label" style={{ borderRadius: "10px" }}>User Type</label>
                                        <select className="form-control custom-select" name="userType" value={credentials.userType} onChange={onChange} style={{ borderRadius: "10px" }}>
                                            <option value="">Select</option>
                                            <option value="user">User</option>
                                            <option value="restaurant-admin">Restaurant Admin</option>
                                        </select>
                                    </div>
                                    {showAdditionalFields && (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="contactNumber" className="form-label" style={{ borderRadius: "10px" }}>Contact Number</label>
                                                <input type="text" className="form-control" name='contactNumber' value={credentials.contactNumber} onChange={onChange} style={{ borderRadius: "10px" }} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="shopName" className="form-label" style={{ borderRadius: "10px" }}>Shop Name</label>
                                                <input type="text" className="form-control" name='shopName' value={credentials.shopName} onChange={onChange} style={{ borderRadius: "10px" }} />
                                            </div>
                                        </>
                                    )}
                                    <button type="submit" className="btn btn-success w-100 mb-3" style={{ borderRadius: "10px" }}>Submit</button>
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
