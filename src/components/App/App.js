// import React, { useEffect, useState } from "react";
import './App.css';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Route, Routes } from "react-router-dom";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={<Main />}
        />
        <Route 
          path='/sign-up'
          element={<Register/>}
        />
        <Route 
          path='/sign-in'
          element={<Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
