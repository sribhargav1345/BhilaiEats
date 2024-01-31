
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/signup.js'

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
import { CartProvider } from './components/ContextReducer.js';

// Importing shop details
import ATMart from './screens/Shops/ATMart.js';
import Bakery from './screens/Shops/Bakery.js';
import CafeCoffee from './screens/Shops/CafeCoffee.js';
import Dairy from './screens/Shops/Dairy.js';
import Galav from './screens/Shops/Galav.js';
import Govatsa from './screens/Shops/Govatsa.js';
import MilkShakes from './screens/Shops/MilkShakes.js';
import NJX from './screens/Shops/NJX.js';
import TechCafe from './screens/Shops/TechCafe.js';

// Importing owner details
import Owner_Milkshake from './screens/Owner_data/Milkshake.js';


// Main Component of App
function App() {
  return (
    <CartProvider>                                                      {/* To wrap the entire application */}

      <Router>
        <div>
          <Routes>
            <Route exact path="/"  element = {<Home/>} />               {/* Paths specification (API Endpoint) -> /, /login, /signup */}
            <Route exact path="/login"  element = {<Login/>} />
            <Route exact path="/signup"  element = {<SignUp/>} />
            <Route exact path="/myOrders"  element = {<myOrders/>} />

            {/* Routes of each shops */}
            <Route exact path="/shop/65b5f3329e3f22efa0aacbd2" element = {<ATMart/>} />
            <Route exact path="/shop/65b5f4319e3f22efa0aacbd3" element = {<Bakery/>} />
            <Route exact path="/shop/65b660d325d1fac6691e3ad0" element = {<CafeCoffee/>} />
            <Route exact path="/shop/65b65f8b25d1fac6691e3ace" element = {<Dairy/>} />
            <Route exact path="/shop/65b661e225d1fac6691e3ad2" element = {<Galav/>} />
            <Route exact path="/shop/65b6600f25d1fac6691e3acf" element = {<Govatsa/>} />
            <Route exact path="/shop/65b65de925d1fac6691e3acd" element = {<MilkShakes/>} />
            <Route exact path="/shop/65b6616b25d1fac6691e3ad1" element = {<NJX/>} />
            <Route exact path="/shop/65b5f2e19e3f22efa0aacbd1" element = {<TechCafe/>} />

            {/* Routes of shop owners */}
            <Route exact path="/owner_65b9c50e1ec25cbe9bd921a0" element = {<Owner_Milkshake/>} />

          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
