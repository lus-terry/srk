import React, { useState, useEffect } from 'react';
import { fetchDataFromSanity } from '../../services/Sanity';

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
  const cloneRecurringEvents = (events) => {
    const clonedEvents = [];
    for (let event of events) {
        if (!event.isRecurring) {
            clonedEvents.push(event);
        } else {
            const startTime = new Date(event.startTime);
            const endTime = new Date(event.endTime);
            const recurringEndDate = new Date(event.recurring_end_date);
            while (startTime <= recurringEndDate) {
                const clonedEvent = { ...event };
                clonedEvent.startTime = new Date(startTime);
                clonedEvent.endTime = new Date(endTime);
                clonedEvent.isRecurring = false;
                clonedEvents.push(clonedEvent);
                startTime.setDate(startTime.getDate() + 7);
                endTime.setDate(endTime.getDate() + 7);
            }
        }
    }
    return clonedEvents;
  }
        
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
                      week.push(<td key={j}>
                          <div className="day">{day}</div>
                          <div className="event">
                              <div>{e.name}</div>
                              <div>{startHour}:{startMinutes} - {endHour}:{endMinutes}</div>
                <div>{e.classroom}</div>
                </div>
                </td>);
                }
                });
                if (!event) {
                week.push(<td key={j}>{day}</td>);
                }
                day++;
                } else {
                week.push(<td key={j} className="empty"></td>);
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
                <tr>
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
    <div className="calendar">
      {renderCalendar()}
    </div>
  );
}

export default Calendar;