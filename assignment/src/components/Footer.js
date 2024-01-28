import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5" style={{marginTop:"90px"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/menu" className="text-light text-decoration-none">Menu</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address className="text-light">
              Kanhar Hostel<br />
              IIT Bhilai, Chhatisgarh<br />
              Email: bollapragadasri@iitbhilai.ac.in<br />
              Phone: 7989912068
            </address>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; 2024 GoodFood, Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
