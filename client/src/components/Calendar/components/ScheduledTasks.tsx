import React from 'react'
//import Task from './Task'
import {isSameDay} from 'date-fns'
import Task from './Task'


interface ScheduledTaskProps {
  selectedDate: Date | null
}

const ScheduledTask = ({ selectedDate }: ScheduledTaskProps) => {
  console.log("Selected date in sche:"+selectedDate)
  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'A task where u do this',
      date: new Date(2023, 10, 21),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'A task where u do that',
      date: new Date(2023, 2, 14),
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'A task where u do what',
      date: new Date(2024, 2, 21),
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'A task where u do nothing',
      date: new Date(2024, 2, 22),
    },
  ]
  const filteredTasks = selectedDate
    ? tasks.filter((task) => isSameDay(task.date, selectedDate))
    : tasks;
 
  return (
    <div>
      {filteredTasks.length > 0 ? (
        <div className="bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border shadow w-60 h-fit rounded-lg ml-3">
          <div>
            <h1 className="text-2xl text-center mb-2 ">Tasks</h1>
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.id} className="border px-2">
                  <a href="#">
                    <span className="font-bold">{task.title}</span>
                    <div className="pb-3">{task.description}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}
export default React.memo(ScheduledTask)
