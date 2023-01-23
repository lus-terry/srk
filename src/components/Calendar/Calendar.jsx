import React, { useState } from 'react';

const Calendar = (props) => {
    const [currentDate, setCurrentDate] = useState(props.currentDate);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    const renderCalendar = () => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const startDay = date.getUTCDay() === 0 ? 7 : date.getUTCDay();
        let day = 1;
        let calendar = [];

        for (let i = 0; i < 6; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDay - 1) {
                    week.push(<td key={j} className="empty"></td>);
                } else if (day <= daysInMonth) {
                    week.push(<td key={j}>{day}</td>);
                    day++;
                } else {
                    week.push(<td key={j} className="empty"></td>);
                }
            }
            calendar.push(<tr key={i}>{week}</tr>);
        }

        return calendar;
    }

    return (
      <div className="calendar">
          <div className="calendar-header">
              <button onClick={handlePrevMonth}>{"<"}</button>
              <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <button onClick={handleNextMonth}>{">"}</button>
          </div>
          <table>
              <thead>
                  <tr>
                      {days.map(day => <th key={day}>{day}</th>)}
                  </tr>
              </thead>
              <tbody>
                  {renderCalendar()}
              </tbody>
          </table>
      </div>
  )
};

export default Calendar;