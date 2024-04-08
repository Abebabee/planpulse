import React, { useEffect, useState } from 'react';
import { getAllProjects, getUserData } from '../../../api/apiService';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  name: string;
  description: string;
  ownerId: string;
  ownerEmail?: string; // Add ownerEmail field to Project interface
  _id: string;
}

interface ProjectCardProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const ProjectCard = ({ projects }: { projects: Project[] }) => {
  return (
    <tbody className="divide-y-2 divide-secondary dark:divide-dark_secondary">
      {projects.map((project, index) => (
        <tr className="" key={index}>
          <th className="px-6 py-4 font-medium">{project.name}</th>
          <td className="px-6 py-4">{project.ownerEmail}</td>
          <td className="px-6 py-4">
            <a href={`/projects/${project._id}`} className="block w-full ">
              <FaExternalLinkAlt className="text-primary hover:text-dark_primary_foreground" />
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ProjectCardContainer = ({ sortBy, sortOrder }: ProjectCardProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects();
        if (Array.isArray(fetchedProjects)) {
          // Fetch owner email for each project
          const projectsWithOwnerEmail = await Promise.all(
            fetchedProjects.map(async (project) => {
              const ownerData = await getUserData(project.ownerId);
              return { ...project, ownerEmail: ownerData.email };
            })
          );
          setProjects(projectsWithOwnerEmail);
        } else {
          console.error('Received non-array data for projects:', fetchedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Sort the projects based on the selected category and order
  const sortedProjects = [...projects].sort((a, b) => {
    let comparison = 0;
  
    if (sortBy === 'name') {
      comparison = sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'ownerEmail') {
      // Handle undefined values for ownerEmail
      const ownerEmailA = a.ownerEmail || '';
      const ownerEmailB = b.ownerEmail || '';
      comparison = sortOrder === 'asc' ? ownerEmailA.localeCompare(ownerEmailB) : ownerEmailB.localeCompare(ownerEmailA);
    }
  
    return comparison;
  });

  return <ProjectCard projects={sortedProjects} />;
};

export default ProjectCardContainer;
