import React, { useState, useEffect } from 'react';
import userIcon from '../../Assests/images/user.png';
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showOrders, setShowOrders] = useState(true);
  const [allOrderItems, setAllOrderItems] = useState([]);

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');

        const response = await fetch('http://localhost:5000/api/getUserProfile', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
            'Email': `${email}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        //console.log('User Profile Data:', data);
        setUserProfile(data.userProfile);

        console.log(data);

        setAllOrderItems(data.orders[0].order_data);

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="page-background">
      <div className="user-profile-container">
        <div className="user-info">
          <div className="user-photo">
            <img src={userIcon} alt="User" />
          </div>
          <div className="user-details">
            {/* Render user details dynamically */}
            {userProfile && (
              <>
                <h2 className="user-name">Name: {userProfile.name}</h2>
                <p className="user-email">Email: {userProfile.email}</p>
                <p className="user-phone">Phone: {userProfile.phone}</p>
              </>
            )}
          </div>
        </div>
        <hr className="divider" />
        <div className="user-options">
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleOrders}>My Orders</button>
            {/* {console.log(showOrders)} */}
            {showOrders && (
              <div className="dropdown-content">
                {/* Display all order items below My Orders */}
                {/* {console.log(allOrderItems.length)} */}
                {allOrderItems.length > 0 ? (
                  <div>
                    <h3>All Order Items</h3>
                    {/* {console.log("bcsjabCN")} */}
                    <ul>
                      {allOrderItems.map((order, orderIndex) => (
                        <li key={orderIndex}>
                          <h4>Order {orderIndex + 1}</h4>
                          <ul>
                            {order.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                {item.name}, Quantity: {item.qty}, Size: {item.size}, Price: {item.price}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No order items found.</p>
                )}
              </div>
            )}
          </div>
          {/* Add more dropdown sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

