
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/signup.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";      // Routing front-end and back-end
import { CartProvider } from './components/ContextReducer.js';

function App() {
  return (
    <CartProvider>

      <Router>
        <div>
          <Routes>
            <Route exact path="/"  element = {<Home/>} />               {/* Paths specification (API Endpoint) -> /, /login, /signup */}
            <Route exact path="/login"  element = {<Login/>} />
            <Route exact path="/signup"  element = {<SignUp/>} />
            <Route exact path="/myOrder"  element = {<myOrders/>} />
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
