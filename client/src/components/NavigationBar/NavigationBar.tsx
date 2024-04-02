import NavigationItem from './components/NavigationItem'
import { FaHouse, FaPlus } from 'react-icons/fa6'
import { AiOutlineTeam } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'
import { FaFolderClosed } from "react-icons/fa6";


export default function NavigationBar() {
  return (
    <nav className="w-20 flex flex-col justify-between h-screen bg-secondary text-secondary_foreground dark:bg-dark_accent dark:text-dark_foreground">
      <div className="flex flex-col">
      <NavigationItem title="Home" Icon={FaHouse} href='/'/>
      <NavigationItem title="Team" Icon={AiOutlineTeam} />
      <NavigationItem title="My Projects" Icon={FaFolderClosed} href='/projects'/>
      <NavigationItem title="New project" Icon={FaPlus} href='/createproject'/>
      <NavigationItem title="Projects" Icon={FaFolderClosed} href='/allprojects'/>
      </div>
      <div>
        <NavigationItem title="" href="/settings" Icon={CiSettings} />
      </div>
    </nav>
  )
}
