import {
  MdExpandLess,
  MdExpandMore,
  MdOutlineDragIndicator,
} from 'react-icons/md'
import { IoAdd } from 'react-icons/io5'
import { GoSidebarCollapse } from 'react-icons/go'
import { IoTrashOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Task, getUserData } from '../../../api/apiService'
import { useDrag } from 'react-dnd'
import AssignModal from './AssignModal'

interface DraggableItemProps {
  item: Task
  handleDrop: (itemId: string, targetStatus: string) => void
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, handleDrop }) => {
  const [showMore, setShowMore] = useState(false)
  const [task, setTask] = useState<Task>(item)
  const [assignedUserData, setAssignedUserData] = useState<any[]>([])

  const updateTask = async (updatedTask: Task) => {
    setTask(updatedTask)
    console.log(updatedTask.assignedUsers)

    // getUserData() on each assigned user (updatedTask.assignedUsers)
    if (updatedTask.assignedUsers) {
      const userDataPromises = updatedTask.assignedUsers.map(
        async (userId: string) => {
          const userData = await getUserData(userId)
          console.log(userData)
          return userData
        },
      )

      const userDataArray = await Promise.all(userDataPromises)
      setAssignedUserData(userDataArray)

      // Logging profile picture URLs
      userDataArray.forEach((userData) => {
        console.log(userData.profilePictureUrl)
      })
    }
  }

  const toggleShowMore = () => {
    console.log(item)
    setShowMore(!showMore)
  }
  const [showModal, setShowModal] = useState(false)

  const displayContent = showMore
    ? item.description
    : item.description.slice(0, 100)

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: item.id, status: item.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const borderColor =
    item.prio === 'highest'
      ? 'border-prio_highest'
      : item.prio === 'high'
      ? 'border-prio_high'
      : item.prio === 'medium'
      ? 'border-prio_medium'
      : 'border-prio_low'

  useEffect(() => {
    updateTask(item)
  }, [item])
  useEffect(() => {
    assignedUserData.map((userData) => userData.profilePictureUrl)
  }, [assignedUserData])

  return (
    <div
      ref={drag}
      className={`block mb-3 border rounded-lg shadow-md bg-accent text-accent_foreground dark:bg-dark_accent dark:text-dark_accent_foreground${
        isDragging ? 'opacity-0' : ''
      }`}
    >
      <div
        className={`border-b-2 py-3 px-2 flex justify-between  ${borderColor}`}
      >
        <p>{item.title}</p>
        <span className="cursor-grab text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60">
          <MdOutlineDragIndicator size={20} />
        </span>
      </div>
      <h5 className="mb-2 text-sm font-normal leading-tight px-2 pt-2 ">
        {displayContent}
      </h5>
      {showMore && (
        <div>
          <div className=" text-sm flex flex-row px-2 justify-end text-center">
            <button onClick={() => setShowModal(true)} className='mr-1'>Assign</button>
            <div className="relative items-end">
              {assignedUserData.slice(0, 2).map((userData, index) => (
                <img
                  key={index}
                  src={
                    'https://storage.cloud.google.com/planpulse-image-bucket/' +
                    userData.profilePictureUrl
                  }
                  style={{ width: '30px', height: '30px' }}
                  alt={`Profile Picture ${index}`}
                  className={`${
                    index === 0
                      ? 'relative size-30 z-40 overflow-hidden bg-background border-solid border-2 border-primary rounded-full mr-2 bottom-0 right-0'
                      : 'absolute size-30 z-20 bg-background border-solid border-2 border-dark_primary_foreground brightness-75 dark:brightness-60 rounded-full bottom-0 right-0'
                  }`}
                  
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end mr-2 mt-4">
            <button className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60">
              <IoTrashOutline size={20} className="text-right" />
            </button>
          </div>
        </div>
      )}
      <div className="w-full text-center">
        <button
          onClick={toggleShowMore}
          className="px-2 mb-2 content-center text-primary"
        >
          {showMore ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      <AssignModal
        showModal={showModal}
        setShowModal={setShowModal}
        task={item}
        updateTask={updateTask}
      />
    </div>
  )
}
export default DraggableItem
