import ProjectCard from '../ProjectCard/ProjectCard'

const RecentProjects = () => {
  return (
    <div className=''>
        <h1 className='text-xl'>Recent projects</h1>
      <table className="mt-2 text-sm text-left rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border border-border_color dark:border-dark_border shadow">
        <thead className="text-lg">
          <tr className=''>
            <th className="px-6 py-3">Title</th>
          </tr>
        </thead>
          <ProjectCard/>
      </table>
    </div>
  )
}
export default RecentProjects
