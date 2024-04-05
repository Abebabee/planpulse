import React, { useState } from 'react'
import { createTask } from '../../../api/apiService'
//import {ObjectId} from 'mongodb'
import {ObjectId} from 'bson'
import { Socket } from 'socket.io-client';

interface AddTaskFormProps {
  projectId?: string
  updateProject: (projectId: string) => Promise<void>;
  socket: Socket | null
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ projectId, updateProject,socket }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskTitleError, setTaskTitleError] = useState('')

  const [taskDescription, setTaskDescription] = useState('')
  const [taskDescriptionError, settaskDescriptionError] = useState('')

  const [taskPriority, setTaskPriority] = useState('highest')
  const [taskStatus, setTaskStatus] = useState('To Do')

  const validateTitle = () => {
    if (taskTitle.trim() === '') {
      setTaskTitleError('Task title is required!')
    } else if (taskTitle.length >= 30) {
      setTaskTitleError('Task title must be between 1-30 characters!')
    } else {
      setTaskTitleError('')
    }
  }

  const validateDescription = () => {
    if (taskDescription.length > 500) {
      settaskDescriptionError('Max 500 characters!')
    } else {
      settaskDescriptionError('')
    }
  }

  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
    validateTitle()
  }

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTaskDescription(e.target.value)
    validateDescription()
  }

  const handleTaskPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskPriority(e.target.value)
  }

  const handleTaskStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskStatus(e.target.value)
  }
  const generateUniqueId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const uniqueId = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)).toLowerCase();
    return uniqueId;
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateTitle()
    validateDescription()

    if (!taskTitleError && !taskDescriptionError) {
      const taskId = new ObjectId();
      //console.log("task id: "+taskId)
      if (projectId) {
        try {
          const newTask = {
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            prio: taskPriority,
            id: taskId
          };

          // Create the task
          await createTask(projectId, newTask);

          socket?.emit('newTask',{projectId,newTask})
          // Update the project state by calling the function from the parent component
          await updateProject(projectId);
          
          // Clear the form fields
          setTaskTitle('');
          setTaskDescription('');
          setTaskPriority('highest');
          setTaskStatus('To Do');
        } catch (error) {
          console.error('Error creating task:', error);
        }
      }
    }
  }

  return (
    <form className="mx-auto" style={{ width: '100%' }} onSubmit={handleSubmit}>
      <h4 className="text-lg font-bold mb-5">New Task</h4>
      <div className="mb-5">
        <label htmlFor="tasktitle" className="block mb-2 text-sm font-medium">
          Task title
        </label>
        <input
          type="text"
          id="tasktitle"
          className="shadow-sm text-sm rounded-lg block w-full p-2.5 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Task title..."
          value={taskTitle}
          onChange={handleTaskTitleChange}
          required
        />
        {taskTitleError && (
          <p className="text-red-500 text-sm mt-1">{taskTitleError}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Task description
        </label>
        <textarea
          id="description"
          rows={4}
          className="block p-2.5 w-full text-sm rounded-lg border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Task description..."
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="priority" className="block mb-2">
          Task priority
        </label>
        <select
          name=""
          id="priority"
          className="text-sm rounded-lg w-full p-2.5 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          value={taskPriority}
          onChange={handleTaskPriorityChange}
        >
          <option value="highest">Highest</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="status" className="block mb-2">
          Task status
        </label>
        <select
          name=""
          id="status"
          className="text-sm rounded-lg w-full p-2.5 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          value={taskStatus}
          onChange={handleTaskStatusChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90"
        >
          Add task
        </button>
      </div>
    </form>
  )
}
export default AddTaskForm
