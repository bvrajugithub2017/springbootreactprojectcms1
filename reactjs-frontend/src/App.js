import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListCustomersComponent from './components/ListCustomersComponent';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddCustomerComponent from './components/AddCustomerComponent';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" Component={ListCustomersComponent}></Route>
              <Route path='/customers' Component={ListCustomersComponent}></Route>
              <Route path="/add-customer" Component={AddCustomerComponent}></Route>
              <Route path="/edit-customer/:id" Component={AddCustomerComponent}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>    
    </div>
  );
}

export default App;
