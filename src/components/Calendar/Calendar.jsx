import React, { useState, useEffect } from 'react';
import { fetchDataFromSanity } from '../../services/Sanity';
import { cloneRecurringEvents } from './cloneRecurringEvents';

import { EventDiv } from '../styles/Event.style';
import { EventCell } from '../styles/Event.style';
import { EventDayNumber } from '../styles/Event.style';
import { Event } from '../styles/Event.style';
import { EventName } from '../styles/Event.style';
import { EventTime } from '../styles/Event.style';
import { EventClassroom } from '../styles/Event.style';
import { DayNumber } from '../styles/DayNumber.styled';
import {Cell} from '../styles/Cell.styled';

import './calendarStyles/Content.module.css';
import { StyledCalendar } from '../styles/Calendar.styled';


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
        
        <table>
            <thead>
                <tr>
                    <th onClick={handlePrevMonth}>{'<'}</th>
                    <th colSpan="5">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</th>
                    <th onClick={handleNextMonth}>{'>'}</th>
                </tr>
                <tr className='noBorder'>
                    {days.map((day, index) => <th key={index}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {calendar}
            </tbody>
        </table>
       
    );
}

return (
    <StyledCalendar>
      {renderCalendar()}
    </StyledCalendar>
  );
}

export default Calendar;