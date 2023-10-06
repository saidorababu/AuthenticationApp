/* eslint-disable no-unused-vars */

import { BrowserRouter, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import SignUp from './components/SignUp/SignUp.js';
import Home from './components/Home/Home.js';
import { useState } from 'react';
//import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

function App() {
  const [userData,setUserData] = useState(null);
  const handleLogin = (data)=>{
    setUserData(data);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={userData?<Navigate to="/home" />:<Login onLogin={handleLogin}/>}/>
        <Route path="/signup" exact element={<SignUp  />}/>
        <Route path="/home" exact element={userData?<Home username={userData.username} email = {userData.email} />:<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
  
}
export default App;
