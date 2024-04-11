import React, { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
//import 'react-calendar/dist/Calendar.css';
import '../Calendar/Calendar.css'
import ScheduledTasks from './components/ScheduledTasks'

const CalendarPicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    console.log(date)
  }

  return (
    <div className="m-10 flex flex-row">
      <div>
        <Calendar
          onChange={handleDateChange as CalendarProps['onChange']}
          value={selectedDate}
          className="bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border border-border_color dark:border-dark_border"
        />
      </div>
      <ScheduledTasks selectedDate={selectedDate} />
    </div>
  )
}

export default CalendarPicker
