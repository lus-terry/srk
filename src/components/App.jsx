import React, { useState } from 'react';
import Calendar from './Calendar/Calendar';


import Navbar from './Navbar';
import './App.css'
import Sidebar from './Sidebar';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className='App'>
      <Sidebar/>
      <Navbar />
      <Calendar currentDate={currentDate} />
    </div>
  );
}

export default App;