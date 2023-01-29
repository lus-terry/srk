import React, { useState } from 'react';
import Calendar from './Calendar/Calendar';
import Login from './Login'
import './App.css'
import Navbar from './Navbar';

import './Login'
import './Calendar/Calendar'
import { Route, Routes } from "react-router-dom"



function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>

  <Navbar />
    <div className='App'>
      <div className="container">
        <Routes>
          <Route path="/" element={<Calendar currentDate={currentDate} />} />
          <Route path="/login" element={<Login/>} />
        </Routes>

      </div>
      <Calendar currentDate={currentDate} />  
    </div>
    </>
   
  );
}

export default App