import { Project } from '../../../api/apiService'
import { MdModeEdit } from 'react-icons/md'
import { useState } from 'react'
import { ObjectId } from 'bson'

interface ProjectDescriptionProps {
  project: Project
  projectId: string
  projectDescription: string
  projectTitle: string
}
const ProjectDescription = ({
  project,
  projectId,
  projectDescription,
  projectTitle,
}: ProjectDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(projectDescription)
  const [originalDescription, setOriginalDescription] =
    useState(projectDescription)

  const handleEditClick = () => {
    setOriginalDescription(editedDescription)
    setIsEditing(true)
  }
  const handleSaveClick = () => {
    setIsEditing(false)
  }
  const handleCancelClick = () => {
    setEditedDescription(originalDescription) // Restore the original description
    setIsEditing(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value)
  }

  return (
    <div
      className="ml-2 mt-5 rounded-lg p-3 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow"
      style={{ width: '50%' }}
    >
      <h1 className="text-lg mb-2">Project description</h1>
      <div className="flex flex-col">
        {isEditing ? (
          <div className="flex flex-col">
            <textarea
              rows={4}
              value={editedDescription}
              onChange={handleChange}
              className='rounded-md p-1 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring'
            />
            <div className='flex justify-end'>
              <button className=" font-medium rounded-lg text-sm px-5 py-2 my-2 text-center bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90" onClick={handleSaveClick}>
                Save
              </button>
              <button className="font-medium rounded-lg text-sm px-5 my-2 py-2 ml-2 mr-1 text-center hover:bg-accent dark:hover:bg-dark_accent" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <textarea value={project.description} disabled className='rounded-md p-1'></textarea>
            <button className="ml-5 mr-2 my-3 text-primary hover:text-dark_primary_foreground flex justify-end " onClick={handleEditClick}>
              <MdModeEdit size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProjectDescription
