// frontend/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import userIcon from '../../Assests/images/user.png'; // Import your user icon image
import './UserProfile.css';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showOrders, setShowOrders] = useState(false);

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  useEffect(() => {
    // Function to fetch user profile dynamically
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve token from local storage
        const config = {
          headers: {
            Authorization: authToken,
          },
        };

        const response = await axios.get('/api/getUserProfile', config); // Making GET request to backend API
        setUserProfile(response.data.userProfile); // Set user profile details in state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="page-background"> {/* Add this container for the background color */}
      <div className="user-profile-container">
        <div className="user-info">
          <div className="user-photo">
            <img src={userIcon} alt="User" />
          </div>
          <div className="user-details">
            <h2 className="user-name">User Name</h2>
            <p className="user-email">Email: user@example.com</p>
            <p className="user-phone">Phone: +1234567890</p>
            {/* Add more user details as needed */}
          </div>
        </div>
        <hr className="divider" />
        <div className="user-options">
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleOrders}>My Orders</button>
            {showOrders && (
              <div className="dropdown-content">
                {/* Render My Orders here */}
                <ul>
                  <li>Order 1</li>
                  <li>Order 2</li>
                  {/* Add more orders */}
                </ul>
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




// import React, { useState } from 'react';
// import userIcon from '../../Assests/images/user.png'; // Import your user icon image
// import './UserProfile.css'; // Import the CSS file for UserProfile styling

// const UserProfile = () => {
//   const [showOrders, setShowOrders] = useState(false);

//   const toggleOrders = () => {
//     setShowOrders(!showOrders);
//   };

//   return (
//     <div className="page-background"> {/* Add this container for the background color */}
//       <div className="user-profile-container">
//         <div className="user-info">
//           <div className="user-photo">
//             <img src={userIcon} alt="User" />
//           </div>
//           <div className="user-details">
//             <h2 className="user-name">User Name</h2>
//             <p className="user-email">Email: user@example.com</p>
//             <p className="user-phone">Phone: +1234567890</p>
//             {/* Add more user details as needed */}
//           </div>
//         </div>
//         <hr className="divider" />
//         <div className="user-options">
//           <div className="dropdown">
//             <button className="dropdown-btn" onClick={toggleOrders}>My Orders</button>
//             {showOrders && (
//               <div className="dropdown-content">
//                 {/* Render My Orders here */}
//                 <ul>
//                   <li>Order 1</li>
//                   <li>Order 2</li>
//                   {/* Add more orders */}
//                 </ul>
//               </div>
//             )}
//           </div>
//           {/* Add more dropdown sections as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
