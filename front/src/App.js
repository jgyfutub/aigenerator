// import logo from './logo.svg';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Loginpage from './Pages/Login';
import HomePage from "./Pages/Home";
import Aigenerator from "./Pages/AiGenerator";
import SignUppage from "./Pages/SignUp";
import SavedImages from "./Pages/SavedImages";
import TexttoImage from "./Pages/SuperResolution";
import Savedenhancedimages from "./Pages/savedenhancedimages";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<SignUppage/>}/>
        <Route path='/aigenerator' element={<Aigenerator/>}/>
        <Route path='/SuperResolution' element={<TexttoImage/>}/>
        <Route path='/savedenhancedimages' element={<Savedenhancedimages/>}/>
        <Route path='/savedimages' element={<SavedImages/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
