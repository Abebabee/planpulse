import { createProject } from '../../api/apiService'
import NavigationBar from '../../components/NavigationBar'
import React, { useState } from 'react'
import {ObjectId} from 'bson'
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../utils/authUtils';
import { MdDone, MdOutlineErrorOutline } from "react-icons/md";
interface NewProject {
  _id: ObjectId;
  name: string;
  description: string;
  ownerId: string;
  invitedUsers: []
  tasks: [];
}

const CreateProjectPage = () => {
  
  const [projectTitle, setProjectTitle] = useState('')
  const [projectTitleError, setProjectTitleError] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectDescriptionError, setProjectDescriptionError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")


  const getUserId = ()=>{
    const token = Cookies.get('token')
      if(token){
        const userId = getUserIdFromToken(token)
        if(typeof userId === 'string'){
          return userId
        }
      }
      return ""
  }

  //Validate user input
  const validateTitle = () => {
    if (projectTitle.trim() === '') {
      setProjectTitleError('Task title is required!')
    } else if (projectTitle.length >= 30) {
      setProjectTitleError('Task title must be between 1-30 characters!')
    } else {
      setProjectTitleError('')
    }
  }
  const validateDescription = () => {
    if (projectDescription.length > 500) {
      setProjectDescriptionError('Max 500 characters!')
    } else {
      setProjectDescriptionError('')
    }
  }

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value)
    validateTitle()
  }
  const handleProjectDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProjectDescription(e.target.value)
    validateDescription()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateTitle()
    validateDescription()

    if (!projectTitleError && !projectDescriptionError) {
      console.log(
        'Success! title:' +
          projectTitle +
          ' description: ' +
          projectDescription,
      )
      //Gör något här, skicka till databas och printa sedan ut den i vänstra spalten!
      const tempId = new ObjectId()


      const newProject: NewProject = {
        _id: tempId, // Convert ObjectId to string and wrap in an object
        name: projectTitle,
        description: projectDescription,
        ownerId: getUserId(),
        invitedUsers: [],
        tasks: []
    };
      console.log(newProject._id)
      try{
        await createProject(newProject)
        setAlertMessage("Project created successfully!")
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000) // 2 seconds
      }catch(error){
        setAlertMessage("Project creation failed!")
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000) // 2 seconds
      }
      
      //await createProject()
    }
  }
  return (
    <div className="flex flex-row bg-light_bg text-light_primary_text dark:bg-dark_bg dark:text-dark_primary_text">
      <div className="flex">
        <NavigationBar />
      </div>
      <form
        className="mx-auto mt-10 p-5 rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow"
        style={{ width: '20%', height: '100%' }}
        onSubmit={handleSubmit}
      >
        <h4 className="text-lg font-bold mb-5 text-center ">Create Project</h4>
        <div className="mb-5">
          <label htmlFor="projecttitle" className="block mb-2 text-sm font-medium ">
            Project title
          </label>
          <input
            type="text"
            id="projecttitle"
            className="shadow-sm text-sm rounded-lg block w-full p-2.5 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Title..."
            required
            value={projectTitle}
            onChange={handleProjectTitleChange}
          />
          {projectTitleError && (
          <p className="text-red-500 text-sm mt-1">{projectTitleError}</p>
        )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium "
          >
            Project description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm rounded-lg border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Project description..."
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          ></textarea>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save
          </button>
        </div>
      </form>
      {showAlert && (
          <div className={`absolute bottom-0 right-0 p-3 mb-3 rounded-md text-center ${alertMessage.includes('successfully') ? 'bg-primary' : 'bg-progress_low'}`}>
            {alertMessage.includes('successfully') ? <MdDone size={30} /> : <MdOutlineErrorOutline size={30} />}
            <p>{alertMessage}</p>
          </div>
        )}
    </div>
  )
}
export default CreateProjectPage
