import { Project } from '../../../api/apiService'
import { MdModeEdit } from 'react-icons/md'
import { useState } from 'react'
import { ObjectId } from 'bson'
import RichEditor from './RichEditor/RichEditor'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import React from 'react'


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
    
    const content = convertFromRaw(JSON.parse(projectDescription))
    const [editorState, setEditorState] = React.useState(() => 
      EditorState.createWithContent(content)
    );
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
      className="ml-2 mt-5 lg:w-2/4 rounded-lg p-3 bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow"
      
    >
      <h1 className="text-lg mb-2">Project description</h1>
      <div className="flex flex-col">
        {isEditing ? (
          <div className="flex flex-col">
            <RichEditor projectId={projectId} projectDescription={projectDescription} handleCancelClick={handleCancelClick}></RichEditor>
            {/*Buttons here instead */}
          </div>
        ) : (
          <div className="flex flex-col">
            <Editor editorState={editorState} onChange={()=>""}></Editor>
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
