import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import GoogleUserProvider, {
  GoogleUserContext,
} from '../../../../contexts/GoogleUserContext'
import { IconType } from 'react-icons'
import { IoIosLogOut } from 'react-icons/io'
import { CiSettings } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import Cookies from 'js-cookie'
import { getEmailFromToken, getUserIdFromToken } from '../../../../utils/authUtils'

interface NavDropdownProps {}

const NavDropdown = ({}: NavDropdownProps) => {
  const navigate = useNavigate()
    const logOut = () =>{
        //log out thingy here
        Cookies.remove('token')
        navigate('/')
    }
  const getEmail = ()=>{
    const token = Cookies.get('token')
    if(token){
      const userEmail = getEmailFromToken(token)
      return userEmail
    }
    
  }
  const getUserId = ()=>{
    const token = Cookies.get('token')
    if(token){
      const userId = getUserIdFromToken(token)
      return userId
    }
  }
  const { googleUser } = useContext(GoogleUserContext)
  return (
    <div>
      <div className="absolute z-50 right-0 w-50 mt-2 py-2 bg-secondary text-secondary_foreground dark:bg-dark_secondary dark:text-dark_foreground">
        <div className="px-4 py-2 text-sm ">
          <p>{getEmail()}</p>
        </div>
        <hr></hr>
        <a
          href="#"
          className=" px-4 pt-2 text-normal  rounded flex flex-row items-center hover:text-secondary_foreground/80 dark:hover:text-dark_secondary_foreground/70"
        >
          <p>Profile</p>
        </a>
        <Link
          to="/settings"
          className="px-4 py-2 text-normal  rounded flex flex-row items-center hover:text-secondary_foreground/80 dark:hover:text-dark_secondary_foreground/70"
        >
          <p>Settings</p>
        </Link>
        <hr />
        <a
          href="#"
          onClick={logOut}
          className="px-4 py-2 text-normal rounded flex flex-row items-center hover:text-secondary_foreground/80 dark:hover:text-dark_secondary_foreground/70"
        >
          <IoIosLogOut className="text-progress_low" />
          <p className="px-1 text-progress_low">Logout</p>
        </a>
      </div>
    </div>
  )
}

export default React.memo(NavDropdown)
