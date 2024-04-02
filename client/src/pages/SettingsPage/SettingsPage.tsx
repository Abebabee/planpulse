import EditProfile from '../../components/EditProfile/EditProfile'
import NavigationBar from '../../components/NavigationBar'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineWorkOutline, MdModeEdit } from 'react-icons/md'
import { GrLocation } from 'react-icons/gr'
import { addProfilePicture } from '../../api/apiService'
import { getUserIdFromToken } from '../../utils/authUtils'
import { getUserData } from '../../api/apiService'; 
import profilePicture from '../../assets/default.png'
import Cookies from 'js-cookie'
import Footer from '../../components/Footer/Footer'

//import {profile_image} from '../../../public/images/profile_picture.svg'
export default function SettingsPage() {
  const [isHovered, setIsHovered] = useState(false)
  const inputFile = useRef<HTMLInputElement | null>(null); 
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const handleEditClick = () =>{
    if(inputFile.current){
      inputFile.current.click()
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if(event.target.files){
      const file = event.target.files[0]
      console.log(file)
      //Skicka till apiService
      const token = Cookies.get('token');
      if(token){
        const userId = getUserIdFromToken(token)
        if(userId){
          addProfilePicture(userId, file)
        }
      }

      
    }
  }
  useEffect(() => {
    // Fetch user data including the profile picture URL when the component mounts
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (token) {
        const userId = getUserIdFromToken(token);
        if (userId) {
          try {
            const userData = await getUserData(userId);
            console.log(userData)
            // Assuming the response includes the profilePictureUrl field
            setProfilePictureUrl(userData.profilePictureUrl);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  return (
    <body className='flex flex-col min-h-screen'>
      <div className="flex flex-row min-h-full bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
      <div className="flex">
        <NavigationBar />
      </div>
      <div className="flex flex-col " style={{ width: '100%' }}>
        <div
          className="cool relative bg-input dark:bg-dark_card"
          style={{ width: '100%', minHeight: '200px' }}
        >
          <div className="uncool mt-7 flex justify-center ">
            <div
              className="shadow-2xl rounded-full relative transform translate-y-1/3 border-2 border-primary"
              style={{ width: '200px', height: '200px' }}
            >
              <div className="absolute inset-0 rounded-full">
                <img
                  src={profilePictureUrl ?'https://storage.cloud.google.com/planpulse-image-bucket/'+profilePictureUrl : profilePicture}
                  alt=""
                  className={`rounded-full object-cover h-full w-full${
                    isHovered ? 'filter blur-[1px]' : ''
                  }`}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-full">
                <button
                  className="text-light_action_button w-full h-full flex justify-center items-center opacity-0 hover:opacity-100"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleEditClick}
                >
                  <MdModeEdit size={25} className='text-primary'/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <input type="file" id='file' ref={inputFile} className='hidden' onChange={handleFileChange}/>
         
        <div className="flex flex-row justify-evenly" style={{ width: '100%' }}>
          <div
            className="mt-20 text-center rounded-lg shadow-md bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border"
            style={{ width: '30%' }}
          >
            <div>
              <h1 className="mt-3 font-bold text-md">Albin Fernström</h1>
              <ul className="p-2">
                <li className="flex flex-row py-2">
                  <MdOutlineWorkOutline size={20} className='text-primary'></MdOutlineWorkOutline>
                  <p className="pl-1">Software Developer</p>
                </li>
                <li className="flex flex-row">
                  <GrLocation size={20} className='text-primary'></GrLocation>
                  <p className="pl-1">Gothenburg, Sweden</p>
                </li>
              </ul>
              <div className="m-2 mr-3 flex justify-end">
                <button className="text-primary">
                  <MdModeEdit size={20}></MdModeEdit>
                </button>
              </div>
            </div>
          </div>
          <div
            className="mt-20 text-center rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow-md"
            style={{ width: '60%' }}
          >
            right content?
          </div>
        </div>
      </div>
      {/* <EditProfile /> */}
      
    </div>
    <Footer></Footer>
    </body>
    
  )
}
