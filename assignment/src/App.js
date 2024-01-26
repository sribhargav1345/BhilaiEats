
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
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
