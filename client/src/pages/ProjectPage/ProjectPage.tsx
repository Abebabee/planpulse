import { Link } from 'react-router-dom'
import NavigationBar from '../../components/NavigationBar'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ObjectId } from 'bson'
import { io, Socket } from 'socket.io-client'
import { IoAdd } from 'react-icons/io5'
import { GoSidebarCollapse } from 'react-icons/go'
import { CiChat2 } from 'react-icons/ci'
import AddTaskForm from '../../components/ProjectComponents/AddTaskForm/AddTaskForm'
import AddCollaborator from '../../components/ProjectComponents/AddCollaborator/AddCollaborator' // Import AddCollaborator component
import { Project, getProjectById, updateTaskStatus } from '../../api/apiService'
import ProjectDescription from '../../components/ProjectComponents/ProjectDescription/ProjectDescription'
import CircularCompletion from '../../components/CompletionCard/CircularCompletion/CircularCompletion'
import Column from '../../components/TaskColumns/ColumnComponents/Column'
import Footer from '../../components/Footer/Footer'
import Chat from '../../components/ProjectComponents/Chat/Chat'

interface Task {
  id: ObjectId
  description: string
  status: string
  title: string
  prio: string
}

const ProjectPage: React.FC = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [showAddCollaborator, setShowAddCollaborator] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (projectId) {
          const projectData = await getProjectById(projectId)
          setProject(projectData)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      }
    }

    fetchProject()
  }, [projectId])

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('newTaskUpdated', (data) => {
      console.log('Data below!')
      console.log(data)
      console.log(projectId)
      if (data.projectId == projectId?.toString()) {
        console.log('Hej i newTask')
        setProject((prevProject) => {
          if (!prevProject) return null
          const updatedTasks = [...prevProject.tasks, data.newTask]
          return { ...prevProject, tasks: updatedTasks }
        })
      }
    })
    return () => {
      socket.off('newTask')
    }
  }, [socket, projectId])

  useEffect(() => {
    // Listen for taskStatusUpdated event from the server
    const handleTaskStatusUpdate = (data: {
      projectId: string
      taskId: string
      status: string
    }) => {
      // Update the task status in the frontend
      // Find the task in the project state and update its status
      setProject((prevProject: Project | null) => {
        if (!prevProject) return null // Check if project is null
        // Clone the project to avoid mutating the state directly
        const updatedProject: Project = { ...prevProject }
        // Find the task by ID and update its status
        const updatedTasks = updatedProject.tasks.map((task) => {
          if (task.id.toString() === data.taskId) {
            return { ...task, status: data.status }
          }
          return task
        })
        // Update the tasks array in the project and return the updated project
        return { ...updatedProject, tasks: updatedTasks }
      })
    }

    // Subscribe to taskStatusUpdated event
    socket?.on('taskStatusUpdated', handleTaskStatusUpdate)

    // Cleanup function to unsubscribe from the event when component unmounts
    return () => {
      socket?.off('taskStatusUpdated', handleTaskStatusUpdate)
    }
  }, [socket, setProject])

  const countTasksByStatus = (status: string) =>
    project?.tasks.filter((task) => task.status === status).length || 0

  const handleIoAddClick = () => {
    setShowAddTaskForm(!showAddTaskForm) // Toggle the visibility of AddTaskForm
    setShowAddCollaborator(false) // Hide AddCollaborator when AddTaskForm is clicked
  }

  const handleAddCollaboratorClick = () => {
    setShowAddCollaborator(!showAddCollaborator) // Toggle the visibility of AddCollaborator
    setShowAddTaskForm(false) // Hide AddTaskForm when AddCollaborator is clicked
  }

  if (!project) {
    return <div>Loading...</div>
  }

  const handleDrop = async (itemId: string, targetStatus: string) => {
    try {
      const updatedTasks = project.tasks.map((task: Task) => {
        if (task.id.toString() === itemId) {
          // Update the status of the task directly in the project state
          task.status = targetStatus
          // Optionally, update the task status in the database
          if (projectId) {
            updateTaskStatus(projectId, itemId, targetStatus)
            socket?.emit('taskStatusUpdate', {
              projectId,
              taskId: itemId,
              status: targetStatus,
            })
          }
        }
        return task
      })
      // Update the project state with the modified tasks
      setProject({ ...project, tasks: updatedTasks })
      const doneCount = countTasksByStatus('Done')
      const unfinishedCount =
        countTasksByStatus('To Do') + countTasksByStatus('In Progress')
      //setTaskCounts({ done: doneCount, unfinished: unfinishedCount })
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const updateProject = async (projectId: string) => {
    try {
      const updatedProjectData = await getProjectById(projectId)
      setProject(updatedProjectData)
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  return (
    <body className="flex flex-col min-h-screen">
      <div className="flex ">
        <div>
          <NavigationBar />
        </div>
        <div className="flex flex-col w-full bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
          <div
            className="flex flex-row justify-between"
            style={{ width: '95%' }}
          >
            <p className="text-4xl m-3 pl-5">{project?.name}</p>
            <div>
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className=" font-medium rounded-lg text-sm px-5 py-2 text-center mt-5 bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90"
                type="button"
                onClick={handleAddCollaboratorClick} // Attach onClick handler for Add Collaborator button
              >
                Add collaborators
              </button>
            </div>
          </div>
          <div className="ml-2 mr-2 separator flex lg:flex-row flex-col-reverse">
            <div
              className="grid relative lg:grid-cols-3 gap-4 lg:gap-0 lg:w-4/5 rounded-lg p-3 shadow-lg pt-12 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border"
              
            >
              <div className="absolute top-2 px-3 py-0.3 right-2 mt-2 rounded-md ">
                <button
                  className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60 font-medium rounded-lg text-sm px-2 py-1 text-center"
                  onClick={handleIoAddClick}
                >
                  {showAddTaskForm ? (
                    <GoSidebarCollapse
                      size={20}
                      className="text-primary hover:text-dark_primary_foreground"
                    />
                  ) : (
                    <IoAdd
                      size={20}
                      className="rounded-lg text-primary hover:text-dark_primary_foreground"
                    />
                  )}
                </button>
              </div>
                <Column
                  status="To Do"
                  items={project?.tasks || []}
                  handleDrop={(itemId: string) => handleDrop(itemId, 'To Do')}
                />
                <Column
                  status="In Progress"
                  items={project?.tasks || []}
                  handleDrop={(itemId: string) =>
                    handleDrop(itemId, 'In Progress')
                  }
                />
                <Column
                  status="Done"
                  items={project?.tasks || []}
                  handleDrop={(itemId: string) => handleDrop(itemId, 'Done')}
                />
            </div>

            {showAddTaskForm && (
              <div
                className="flex flex-col md:w-full lg:w-1/5 align-center rounded-lg p-5 shadow-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border"
                
              >
                <AddTaskForm
                  projectId={projectId}
                  updateProject={updateProject}
                  socket={socket}
                />
              </div>
            )}

            {showAddCollaborator && (
              <div
                className="flex flex-col md:w-full lg:w-1/5 align-center rounded-lg p-5 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow"
              >
                <AddCollaborator projectId={projectId} />
              </div>
            )}
          </div>
          <div className="flex flex-row mb-2">
            <ProjectDescription
              project={project}
              projectId={project._id}
              projectDescription={project.description}
              projectTitle={project.name}
            />
            <CircularCompletion
              finishedTasks={countTasksByStatus('Done')}
              unfinishedTasks={
                countTasksByStatus('To Do') + countTasksByStatus('In Progress')
              }
            />
          </div>
        </div>
      </div>

      <Footer></Footer>
      <div className="fixed bottom-0 right-0 mr-2 mb-2">
        <button
          className="rounded-full bg-primary hover:bg-primary/70 text-dark_foreground p-2 opacity-90"
          onClick={() => {
            setShowChat(!showChat)
          }}
        >
          <CiChat2 size={30}></CiChat2>
        </button>
      </div>
      {showChat && (
        <Chat
          projectId={projectId}
          projectName={project.name}
          socket={socket}
        ></Chat>
      )}
    </body>
  )
}
export default ProjectPage
