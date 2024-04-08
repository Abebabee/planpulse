import React, { useState } from 'react'
import ProjectCardContainer from '../ProjectCard/ProjectCard'
import { FaSort } from 'react-icons/fa'

const RecentProjects = () => {
  const [sortBy, setSortBy] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Function to handle sorting change
  const handleSortChange = (category: string) => {
    // If already sorted by the selected category, toggle the order
    if (category === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // If sorting by a different category, set the new category and default to ascending order
      setSortBy(category)
      setSortOrder('asc')
    }
  }

  return (
    <div className="">
      <h1 className="text-xl">Recent projects</h1>
      <table className="mt-2 text-sm text-left rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border border-border_color dark:border-dark_border shadow">
        <thead className="text-md">
          <tr>
            <th
              className="px-6 py-3 cursor-pointer flex flex-row items-center"
              onClick={() => handleSortChange('name')} // Sort by name when clicked
            >
              <div className="flex flex-row items-center">
                <p>Title</p>
                <FaSort size={10} className="text-primary pl-1"></FaSort>
              </div>
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSortChange('ownerEmail')} // Sort by ownerEmail when clicked
            >
              <div className="flex flex-row items-center">
                <p>Owner</p>
                <FaSort size={10} className="text-primary pl-1"></FaSort>
              </div>
            </th>
          </tr>
        </thead>
        <ProjectCardContainer sortBy={sortBy} sortOrder={sortOrder} />
      </table>
    </div>
  )
}

export default RecentProjects
