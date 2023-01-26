import React, { useState } from 'react';

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

const subjects = ["Programiranje 1", "Razvoj web aplikacija"];

const events = [
    {
        "_createdAt": "2023-01-22T02:07:18Z",
        "_id": "f0e31525-d39c-4806-969c-fd58cd703586",
        "_rev": "EBTSvGxcQfdrSaMROA9MuI",
        "_type": "event",
        "classroom": "U10",
        "endTime": "2023-01-23T03:07:00.000Z",
        "event_type": "Predavanje",
        "isRecurring": true,
        "name": "Programiranje 1",
        "recurring_end_date": "2023-03-27",
        "startTime": "2023-01-23T02:06:00.000Z",
        "subject": "Programiranje 1",
        "_updatedAt": "2023-01-26T18:06:27.562Z"
      },
      {
        "_createdAt": "2023-01-23T17:33:32Z",
        "_id": "c484abd7-dcd4-40e9-8d92-e019bc149860",
        "_rev": "3hMG0LxcI5T7B5ziDCUvDx",
        "_type": "event",
        "_updatedAt": "2023-01-26T18:06:11Z",
        "classroom": "P10",
        "endTime": "2023-01-24T20:04:00.000Z",
        "event_type": "Ispit",
        "isRecurring": false,
        "name": "RWA",
        "startTime": "2023-01-24T18:04:00.000Z",
        "subject": "Razvoj web aplikacija"
      }
]
      
const clonedEvents = cloneRecurringEvents(events);
const sortedClonedEvents = clonedEvents.slice().sort((a, b) => {
  return new Date(a.startTime) - new Date(b.startTime);
});

// Filter based on the user's subjects
const filteredEvents = sortedClonedEvents.filter(event => subjects.includes(event.subject));
console.log(filteredEvents);

const Calendar = (props) => {
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
      
