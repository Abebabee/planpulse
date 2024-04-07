import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { BlockStyleControls, InlineStyleControls } from "./components/RichComponents";

const RichEditor: React.FC = () => {

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

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
      </div>
  );
};

export default RichEditor;
