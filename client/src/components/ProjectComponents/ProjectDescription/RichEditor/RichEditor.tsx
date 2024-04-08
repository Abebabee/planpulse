import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { BlockStyleControls, InlineStyleControls } from "./components/RichComponents";
import { Project, createNewProjectDescription } from '../../../../api/apiService';

interface RichEditorProps{
  project?: Project
  projectId?: string
  projectDescription: string
  projectTitle?: string
  handleCancelClick: ()=>void
}

const RichEditor = ({
  project,
  projectId,
  projectDescription,
  projectTitle,
  handleCancelClick
}: RichEditorProps) => {

  const content = convertFromRaw(JSON.parse(projectDescription))
  const [editorState, setEditorState] = React.useState(() => 
    EditorState.createWithContent(content)
  );

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleSaveClick = async () => {
    const rawDescription = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(rawDescription)
    console.log(typeof(rawDescription))

    if(projectId){
      console.log("Trying to create!")
      await createNewProjectDescription(projectId, rawDescription)
    }
  }


  return (
      <div className="editor__container">
        <div className="toolbar">
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
          />
        </div>
        <div className='flex justify-end'>
              <button className=" font-medium rounded-lg text-sm px-5 py-2 my-2 text-center bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90"onClick={handleSaveClick}>
                Save
              </button>
              <button className="font-medium rounded-lg text-sm px-5 my-2 py-2 ml-2 mr-1 text-center hover:bg-accent dark:hover:bg-dark_accent" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
      </div>
  );
};

export default RichEditor;
