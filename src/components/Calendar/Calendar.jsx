import React, { useState, useEffect } from 'react';
import { fetchDataFromSanity } from '../../services/Sanity';
import { cloneRecurringEvents } from './cloneRecurringEvents';

import { EventDiv } from './calendarStyles/Event.style';
import { EventCell } from './calendarStyles/Event.style';
import { EventDayNumber } from './calendarStyles/Event.style';
import { Event } from './calendarStyles/Event.style';
import { EventName } from './calendarStyles/Event.style';
import { EventTime } from './calendarStyles/Event.style';
import { EventClassroom } from './calendarStyles/Event.style';
import { DayNumber } from './calendarStyles/DayNumber.styled';


import './calendarStyles/Content.module.css';



const subjects = ["Programiranje 1", "Razvoj web aplikacija"];

const Calendar = (props) => {
  // calls function to fetch events from Sanity
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchDataFromSanity()
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  // Clones recurring events, adjusting start/end time and marking as non-recurring      
  const clonedEvents = cloneRecurringEvents(events);
  
  const sortedClonedEvents = clonedEvents.slice().sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });
  
  // Filter based on the user's subjects
  const filteredEvents = sortedClonedEvents.filter(event => subjects.includes(event.subject));

  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
              let event = false;
              filteredEvents.map(e => {
                  const eventStartDate = new Date(e.startTime);
                  if (eventStartDate.getDate() === day && eventStartDate.getMonth() === currentDate.getMonth() && eventStartDate.getFullYear() === currentDate.getFullYear()) {
                      const startHour = eventStartDate.getHours().toString().padStart(2, '0');
                      const startMinutes = eventStartDate.getMinutes().toString().padStart(2, '0');
                      const endDate = new Date(e.endTime);
                      const endHour = endDate.getHours().toString().padStart(2, '0');
                      const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

                      event = true;
                      week.push(<EventCell key={j}>
                        <EventDiv>
                        <EventDayNumber>{day}</EventDayNumber>
                        <Event>
                            <EventName>{e.name}</EventName>
                            <EventTime>{startHour}:{startMinutes} - {endHour}:{endMinutes}</EventTime>
                            <EventClassroom>{e.classroom}</EventClassroom>
                        </Event>
                        </EventDiv>
                         
                </EventCell>);
                }
                });
                if (!event) {
                week.push(<DayNumber key={j}>{day}</DayNumber>);
                }
                day++;
                } else {
                week.push(<td key={j}></td>);
          }}
          calendar.push(<tr key={i}>{week}</tr>);
      }
      return (
        <div className='mainDiv'>

   
       
        <table className='headerCalendar'>
        <tr>
          <th className='col1'>
            <div  onClick={handlePrevMonth} className="prev">{'<'}</div>
          </th>
          <th className='col2'>
            <div onClick={handleNextMonth} className="next">{'>'}</div>
          </th>
          <th className='col3' colSpan={5}>
            <div  className="monthName">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
          </th>
        </tr>
        </table>
        <table className='dayName'>
        <tr >
          {days.map((day, index) => <th key={index}>{day}</th>)}       
        </tr>
        </table>

        <table  className="mainTable">
            <tbody>
                {calendar}
            </tbody>
        </table>

        </div>
       
    );
}

return (
    <div className='Calendar'>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;