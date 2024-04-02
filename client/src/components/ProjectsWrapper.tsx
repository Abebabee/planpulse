import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProjectPage from '../pages/ProjectPage/ProjectPage'; // Adjust the import path as needed

const ProjectsWrapper: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ProjectPage />
    </DndProvider>
  );
};

export default ProjectsWrapper;