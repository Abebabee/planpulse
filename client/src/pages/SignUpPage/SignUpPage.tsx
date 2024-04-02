import LoginButton from '../../components/LoginForm/LoginButton'
import InputField from '../../components/LoginForm/InputField'
import PasswordField from '../../components/LoginForm/PasswordField'
import { CiMail } from 'react-icons/ci'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { createNewUser } from '../../api/apiService'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface NewUser {
  fullname:string
  email: string
  password: string
}
function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined
}
export default function SignUpPage() {
  const navigate = useNavigate()
  const [userFullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userConfirmPassword, setUserConfirmPassword] = useState('')
  //const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState(1)
  const handleClick = () => {
    console.log(userEmail, userPassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    if (userPassword !== userConfirmPassword) {
      console.log('Passwords not matching')
    } else if (userPassword.length < 7) {
      console.log('Password too short! Minimum 7 characters')
    } else if (!specialChars.test(userPassword)) {
      console.log('Password requires special characters')
    } else {
      console.log('User details:', userEmail, userPassword)

      const newUser: NewUser = {
        fullname: userFullName,
        email: userEmail,
        password: userPassword,
      }
      try {
        const response = await createNewUser(newUser)
        //go to "/homepage"
        if (response.status == 201) {
          navigate('/')
        }
      } catch (error) {
        if (isAxiosError(error)) {
          // Check if email already exists
          if ((error as AxiosError).response?.status === 400) {
            setError('Email already exists!')
          } else {
            setError('An error occurred. Please try again later.')
          }
        } else {
          setError('An error occurred. Please try again later.')
        }
      }
    }
  }

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
      <div className="w-85 flex flex-col p-6 rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow">
        <div className="w-80 flex flex-col justify-center items-center mb-8">
          <h1 className="mb-2 text-4xl font-bold">Sign up</h1>
          <p className="text-sm text-secondary_foreground dark:text-dark_foreground">
            Enter your details to continue
          </p>
        </div>
        <form action="" className="w-80 flex flex-col" onSubmit={handleSubmit}>
          <InputField
            placeholder="e.g. John Smith"
            type="text"
            id="text"
            title="Full name"
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
          />
          <InputField
            placeholder="example@example.com"
            type="email"
            id="email"
            title="Email"
            Icon={CiMail}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {error && <div className="pb-2 ">{error}</div>}
          <PasswordField
            placeholder="Password"
            type="password"
            id="password"
            title="Password"
            Icon={FaRegEyeSlash}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <PasswordField
            placeholder="Confirm password"
            type="password"
            id="confirmPassword"
            title="Confirm password"
            Icon={FaRegEyeSlash}
            value={userConfirmPassword}
            onChange={(e) => setUserConfirmPassword(e.target.value)}
          />
          <LoginButton title="Sign up" onClick={handleClick} />
        </form>
      </div>
    </div>
  )
}
