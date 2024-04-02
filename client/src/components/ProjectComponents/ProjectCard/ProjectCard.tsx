import React, { useEffect, useState } from 'react'
import { getAllProjects } from '../../../api/apiService'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  name: string
  description: string
  _id: string
}

const ProjectCard = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects();
        console.log("fetched projects below:")
        console.log(fetchedProjects)
        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
          console.log(fetchedProjects); // Log the fetched projects, not the state
        } else {
          console.error('Received non-array data for projects:', fetchedProjects);
        }
      } catch (error) {
        console.log('Något gick fel! ERR: ' + error);
      }
    };

    fetchProjects()
  }, [])
  //"/projects/id:"+project._id
  return (
    <tbody className="divide-y-2 divide-secondary dark:divide-dark_secondary">
      {projects.map((project, index) => (
        <tr className="" key={index}>
          <th className="px-6 py-4 font-medium">
            {project.name}
          </th>
          <td className="px-6 py-4">{project.description}</td>
          <td className="px-6 py-4">
            <a
              href={"/projects/"+project._id}
              className="block w-full "
            >
              {<FaExternalLinkAlt className='text-primary hover:text-dark_primary_foreground'/>}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default ProjectCard
