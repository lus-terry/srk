import React, { useState } from 'react';
import Calendar from './Calendar/Calendar';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="calendar-container">
        <Calendar currentDate={currentDate} />
    </div>
  );
}

export default App;