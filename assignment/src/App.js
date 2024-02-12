
import './App.css';
import Home from './screens/User/Home';
import UserProfile from './screens/User/UserProfile.js';
import Login from './screens/Common_In_All/Login';
import SignUp from './screens/Common_In_All/signup.js';

// Import bootstrap files.
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";                                              // Routing front-end and back-end, components for routing in React
import { CartProvider } from './components/User/ContextReducer.js';

// Importing shop details
import ATMart from './screens/Super_Admin/Shops/ATMart.js';
import Bakery from './screens/Super_Admin/Shops/Bakery.js';
import CafeCoffee from './screens/Super_Admin/Shops/CafeCoffee.js';
import Dairy from './screens/Super_Admin/Shops/Dairy.js';
import Galav from './screens/Super_Admin/Shops/Galav.js';
import Govatsa from './screens/Super_Admin/Shops/Govatsa.js';
import MilkShakes from './screens/Super_Admin/Shops/MilkShakes.js';
import NJX from './screens/Super_Admin/Shops/NJX.js';
import TechCafe from './screens/Super_Admin/Shops/TechCafe.js';
import DynamicOwner from './screens/Owner_data/DynamicOwner.js';

import Add_Shops from './screens/Super_Admin/Add_shop.js'

// Importing owner_add Item details
import Add_item_Milkshake from './screens/Owner_data/Add_item.js'

// Importing SuperAdmin details
import Home_SuperAdmin from  "./screens/Super_Admin/Home_SuperAdmin.js";


// Main Component of App
function App() {
  return (
    <CartProvider>                                                      {/* To wrap the entire application */}

      <Router>
        <div>
          <Routes>

            {/* These are the routes for Homepage, Login, signup and myorders page */}
            <Route exact path="/" element = {<Home/>} />            
            <Route exact path="/login"  element = {<Login/>} />                 {/* Completed */}
            <Route exact path="/signup"  element = {<SignUp/>} />               {/* Completed */}
            <Route exact path="/myOrders"  element = {<myOrders/>} />
            <Route exact path="/userProfile"  element = {<UserProfile/>} />

            {/* Routes for different types of users */}
            <Route exact path="/user"  element = {<Home/>} />
            <Route exact path="/owner"  element = {<Home/>} />
            <Route exact path="/superadmin"  element = {<Home_SuperAdmin/>} />

            {/* <Route exact path='/owner/:owner_id' element={<Owner_Milkshake />} /> */}
            <Route exact path='/owner/:owner_id' element={<DynamicOwner />} />

            {/* Routes of shop owners */}
            {/* <Route exact path="/owner_65b9c50e1ec25cbe9bd921a0" element = {<Owner_Milkshake/>} /> */}
            <Route exact path="/superadmin/add_shops" element = {<Add_Shops/>} />

            {/* Routes of Add_items of shop_owners */}
            <Route exact path="/owner/:owner_id/add_item" element = {<Add_item_Milkshake/>} />
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;

{/* The down parts will be removed after sometime */}
  {/* Routes of each shops */}
  {/* <Route exact path="/shop/65b5f3329e3f22efa0aacbd2" element = {<ATMart/>} />
  <Route exact path="/shop/65b5f4319e3f22efa0aacbd3" element = {<Bakery/>} />
  <Route exact path="/shop/65b660d325d1fac6691e3ad0" element = {<CafeCoffee/>} />
  <Route exact path="/shop/65b65f8b25d1fac6691e3ace" element = {<Dairy/>} />
  <Route exact path="/shop/65b661e225d1fac6691e3ad2" element = {<Galav/>} />
  <Route exact path="/shop/65b6600f25d1fac6691e3acf" element = {<Govatsa/>} />
  <Route exact path="/shop/65b65de925d1fac6691e3acd" element = {<MilkShakes/>} />
  <Route exact path="/shop/65b6616b25d1fac6691e3ad1" element = {<NJX/>} />
  <Route exact path="/shop/65b5f2e19e3f22efa0aacbd1" element = {<TechCafe/>} /> */}

  {/* <Route exact path="/shop/:_id" element={<DynamicShopComponent />} /> */}
  {/* Owner related pages */}