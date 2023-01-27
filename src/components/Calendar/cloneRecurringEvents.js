export const cloneRecurringEvents = (events) => {
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