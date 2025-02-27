import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProduct from './AddProduct';
import AddUser from './AddUser';
import UpdateProduct from './UpdateProduct';
import UpdateUser from './UpdateUser';
import Protected from './Protected';
import ProductList from './ProductList';
import UserList from './UserList';
import SearchProduct from './SearchProduct';
import SearchUser from './SearchUser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>   
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected Cmp={AddProduct} />} />
          <Route path="/adduser" element={<Protected Cmp={AddUser} />} />
          <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
          <Route path="/listuser/updateuser/:id" element={<Protected Cmp={UpdateUser} />} />
          <Route path="/search" element={<Protected Cmp={SearchProduct} />} />
          <Route path="/searchuser" element={<Protected Cmp={SearchUser} />} />
          <Route path="/" element={<Protected Cmp={ProductList} />} />
          <Route path="/listuser" element={<Protected Cmp={UserList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
