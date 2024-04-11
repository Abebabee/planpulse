import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getProjectById,
  getTaskById,
  getUserData,
  Project,
  Task,
  updateAssignedUsers,
} from '../../../api/apiService'
import profilePicture from '../../../assets/default.png'

interface ModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  task: Task
  updateTask: (updatedTask: Task) => void
  updateAssigned: (updatedTask: Task) => void
}

const AssignModal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  task,
  updateTask,
  updateAssigned
}) => {
  const { projectId } = useParams()
  const [email, setEmail] = useState('')
  const [project, setProject] = useState<Project | null>(null)
  const [users, setUsers] = useState<string[]>([])
  const [userDataArray, setUserDataArray] = useState<any[]>([])
  const [assignedUserList, setAssignedUserList] = useState<any[]>([])
  const [unassignedUserList, setUnassignedUserList] = useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]) // State to hold selected users

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (projectId) {
          // Check if projectId exists
          const projectData = await getProjectById(projectId)
          setProject(projectData)
          if (projectData) {
            if (projectData.invitedUsers && projectData.ownerId) {
              const allUsers = [
                ...projectData.invitedUsers,
                projectData.ownerId,
              ]
              const uniqueUsers = Array.from(new Set(allUsers))
              setUsers(uniqueUsers)
              const tempUserDataArray = []
              for (const user of uniqueUsers) {
                //save in new array
                let tempUserData = await getUserData(user)
                //userDataArray.push(tempUserData);
                tempUserDataArray.push(tempUserData)
              }
              setUserDataArray(tempUserDataArray)
              setAssignedUserList(
                tempUserDataArray.filter(
                  (item) => task?.assignedUsers?.includes(item._id),
                ),
              )
              setUnassignedUserList(
                tempUserDataArray.filter(
                  (item) => !task?.assignedUsers?.includes(item._id),
                ),
              )
            }
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      }
    }

    fetchProject()
  }, [projectId])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleUserSelect = (userId: string) => {
    const isAssigned = assignedUserList.some((item) => item._id === userId)
    if (isAssigned) {
      const userToUnassign = assignedUserList.find(
        (item) => item._id === userId,
      )
      if (userToUnassign) {
        setAssignedUserList(
          assignedUserList.filter((item) => item._id !== userId),
        )
        setUnassignedUserList([...unassignedUserList, userToUnassign])
      }
    } else {
      const userToAssign = unassignedUserList.find(
        (item) => item._id === userId,
      )
      if (userToAssign) {
        setUnassignedUserList(
          unassignedUserList.filter((item) => item._id !== userId),
        )
        setAssignedUserList([...assignedUserList, userToAssign])
      }
    }
  }
  

  const handleAdd = async () => {
    if (project && task) {
      //assignedUserList contains the correct userIds that should be in the assignedUsers in the db.
      const assignedUserIds = assignedUserList.map((user) => user._id)
      await updateAssignedUsers(project?._id, task.id, assignedUserIds)

      const updatedTaskData = await getTaskById(project._id, task.id.toString());
      
      if(updatedTaskData){
        updateTask(updatedTaskData)
        updateAssigned(updatedTaskData)
      }
      
    }
    setShowModal(false)
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ">
          <div className="rounded-lg p-3 mx-auto border border-border_color dark:border-dark_border bg-accent text-accent_foreground dark:bg-dark_accent dark:text-dark_accent_foreground dark:border-none shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <h2 className="text-lg mb-4">Assign Task</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="p-2 mb-4 rounded-md w-full border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
            />
            {/* Assigned Users List */}
            <div>
              <h3>Assigned Users</h3>
              {assignedUserList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleUserSelect(item._id)}
                  className={`flex flex-row my-2 p-1 rounded-md ${
                    selectedUsers.includes(item._id)
                      ? '' // Apply background color if user is selected
                      : ''
                  }`}
                >
                  <img
                    src={
                      item.profilePictureUrl
                        ? 'https://storage.cloud.google.com/planpulse-image-bucket/' +
                          item.profilePictureUrl
                        : profilePicture
                    }
                    alt=""
                    className="h-6 w-6 object-fit rounded-full mr-2"
                  />
                  <p>{item.email}</p>
                </div>
              ))}
            </div>
            <div>
              <h3>Unassigned Users</h3>
              {unassignedUserList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleUserSelect(item._id)}
                  className={`flex flex-row my-2 p-1 rounded-md ${
                    selectedUsers.includes(item._id)
                      ? '' 
                      : ''
                  }`}
                >
                  <img
                    src={
                      item.profilePictureUrl
                        ? 'https://storage.cloud.google.com/planpulse-image-bucket/' +
                          item.profilePictureUrl
                        : profilePicture
                    }
                    alt=""
                    className="h-6 w-6 object-fit rounded-full mr-2"
                  />
                  <p>{item.email}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleAdd}
              className="px-4 w-full py-2 rounded-md mt-2 bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AssignModal
