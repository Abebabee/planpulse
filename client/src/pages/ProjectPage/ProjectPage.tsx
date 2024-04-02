import { Link } from 'react-router-dom'
import NavigationBar from '../../components/NavigationBar'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ObjectId } from 'bson'
import { IoAdd } from 'react-icons/io5'
import { GoSidebarCollapse } from 'react-icons/go'
import AddTaskForm from '../../components/ProjectComponents/AddTaskForm/AddTaskForm'
import AddCollaborator from '../../components/ProjectComponents/AddCollaborator/AddCollaborator' // Import AddCollaborator component
import { Project, getProjectById, updateTaskStatus } from '../../api/apiService'
import ProjectDescription from '../../components/ProjectComponents/ProjectDescription/ProjectDescription'
import CircularCompletion from '../../components/CompletionCard/CircularCompletion/CircularCompletion'
import Column from '../../components/TaskColumns/ColumnComponents/Column'
import Footer from '../../components/Footer/Footer'

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
  const [showAddCollaborator, setShowAddCollaborator] = useState(false) // State to track AddCollaborator visibility

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
    console.log('hej i handledrop: ' + targetStatus)
    try {
      const updatedTasks = project.tasks.map((task: Task) => {
        console.log('status' + targetStatus)
        if (task.id.toString() === itemId) {
          // Update the status of the task directly in the project state
          task.status = targetStatus
          // Optionally, update the task status in the database
          if (projectId) updateTaskStatus(projectId, itemId, targetStatus)
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
    <body className='flex flex-col min-h-screen'>
    <div className="flex ">
      <div>
        <NavigationBar />
      </div>
      <div className="flex flex-col w-full bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
        <div className="flex flex-row justify-between" style={{ width: '95%' }}>
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
        <div className="ml-2 separator flex flex-row">
          <div
            className="grid relative grid-cols-3 rounded-lg p-3 shadow-lg pt-12 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border"
            style={{ width: showAddTaskForm ? '78%' : '95%' }}
          >
            <div className="absolute top-2 px-3 py-0.3 right-2 mt-2 rounded-md ">
              <button
                className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60 font-medium rounded-lg text-sm px-2 py-1 text-center"
                onClick={handleIoAddClick}
              >
                {showAddTaskForm ? (
                  <GoSidebarCollapse size={20} className="text-primary hover:text-dark_primary_foreground" />
                ) : (
                  <IoAdd size={20} className="rounded-lg text-primary hover:text-dark_primary_foreground" />
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
              handleDrop={(itemId: string) => handleDrop(itemId, 'In Progress')}
            />
            <Column
              status="Done"
              items={project?.tasks || []}
              handleDrop={(itemId: string) => handleDrop(itemId, 'Done')}
            />
          </div>

          {showAddTaskForm && (
            <div
              className="flex flex-col align-center rounded-lg p-5 shadow-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border"
              style={{ width: '20%' }}
            >
              <AddTaskForm
                projectId={projectId}
                updateProject={updateProject}
              />
            </div>
          )}

          {showAddCollaborator && ( // Conditionally render AddCollaborator
            <div
              className="flex flex-col align-center rounded-lg p-5 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow"
              style={{ width: '20%' }}
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
    </body>
  )
}
export default ProjectPage
