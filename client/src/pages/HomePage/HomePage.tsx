import Card from '../../components/Card'
import NavigationBar from '../../components/NavigationBar'
import CalendarPicker from '../../components/Calendar/CalendarPicker'
import { useContext, useState } from 'react'
import GoogleUserProvider, {
  GoogleUserContext,
} from '../../contexts/GoogleUserContext'
import RecentProjects from '../../components/ProjectComponents/RecentProjects/RecentProjects'
import Cookies from 'js-cookie'
import { getUserIdFromToken } from '../../utils/authUtils'
import { getUserData } from '../../api/apiService'

export default function HomePage() {
  const [userName, setUserName] = useState("")

  const fetchData = async () => {
    const token = Cookies.get('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        try {
          const userData = await getUserData(userId);
          console.log(userData)
          // Assuming the response includes the profilePictureUrl field
          setUserName(userData.fullname);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
  };
  fetchData()
  const hourOfDay = new Date().getHours()
  let greetMsg = ''

  if (hourOfDay < 12) {
    greetMsg = 'Good Morning'
  } else if (hourOfDay < 17) {
    greetMsg = 'Good Afternoon'
  } else {
    greetMsg = 'Good Evening'
  }

  const { googleUser } = useContext(GoogleUserContext)

  return (
    <div className="flex flex-row bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
      <div className="flex">
        <NavigationBar />
      </div>
      <div className="flex flex-col">
        <div>
          <p className="text-4xl m-3">
            {greetMsg}, {userName}
          </p>
        </div>
        <div className='flex flex-row'>
          <CalendarPicker></CalendarPicker>
          <RecentProjects></RecentProjects>
          
        </div>
      </div>
    </div>
  )
}
