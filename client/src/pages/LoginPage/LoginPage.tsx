import LoginButton from '../../components/LoginForm/LoginButton'
import InputField from '../../components/LoginForm/InputField'
//import RememberCheckBox from '../../components/LoginForm/RememberCheckBox'
import { CiMail } from 'react-icons/ci'
import { FaRegEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import LoginIcon from '../../components/LoginForm/LoginIcon'
import PasswordField from '../../components/LoginForm/PasswordField'
import {
  useEffect,
  useContext,
  createContext,
  ReactNode,
  useState,
} from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import GoogleUserProvider, {
  GoogleUserContext,
} from '../../contexts/GoogleUserContext'
import { loginUser } from '../../api/apiService'
import { AxiosError, isAxiosError } from 'axios'
//import { useHistory } from 'react-router-dom'

type dataCredential = {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleClick = () => {
    console.log('click')
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //check if details are correct, if so, login
    try {
      const token = await loginUser({email, password })
      localStorage.setItem('token', token)
      console.log("success! token:"+token)
      navigate('/')
    } catch (error) {
      if (isAxiosError(error)) {
        // Check if email already exists
        if ((error as AxiosError).response?.status === 400) {
          setError('Invalid Email');
        } else {
          setError('Invalid Password');
        }
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }
  const { googleUser, setGoogleUser } = useContext(GoogleUserContext)

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-background text-foreground dark:bg-dark_background dark:text-dark_foreground">
      <div className="w-85 flex flex-col  p-6 rounded-lg bg-card text-card_foreground dark:bg-dark_card dark:text-dark_foreground border-2 border-border_color dark:border-dark_border shadow">
        <div className="w-80 flex flex-col justify-center items-center mb-8">
          <h1 className="mb-2 text-4xl font-bold">Log in</h1>
          <p className="text-sm text-opacity-50 text-light_secondary_text dark:text-dark_secondary_text">
            Enter your details to continue
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="example@example.com"
            type="email"
            id="email"
            title="Enter your email"
            Icon={CiMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <PasswordField
            placeholder="password"
            type="password"
            id="password"
            title="Enter your password"
            Icon={FaRegEyeSlash}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className='pb-2 '>{error}</div>}
          <div className="flex flex-row text-sm w-80 justify-between mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                id="rememberCheckBox"
                className="mr-1 accent-primary"
              />
              <label htmlFor="rememberCheckBox">Remember me</label>
            </div>
            <p className="">
              <a href="#" className="underline text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60">
                Recover password
              </a>
            </p>
          </div>
          <LoginButton title="Log in" onClick={handleClick} />
        </form>
        <div className="inline-flex items-center justify-center w-80">
          <hr className="h-px my-8 border-0 bg-dark_secondary_text w-full" />
          <span className="absolute px-3 font-medium   bg-card dark:bg-dark_card -translate-x-1/2  left-1/2 text-foreground dark:text-dark_foreground ">
            or
          </span>
        </div>
        <div className="w-80 flex flex-row justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential !== undefined) {
                //const details = jwtDecode(credentialResponse.credential)
                const details: dataCredential = jwtDecode(
                  credentialResponse.credential,
                )
                console.log(details.picture)
                setGoogleUser({
                  name: details.given_name,
                  email: details.email,
                  avatar_url: details.picture,
                })
                // Get the previous location from state or fallback to '/'
                const previousLocation = location.state?.from || '/'

                // Redirect to the previous location
                navigate(previousLocation)
              }
              console.log(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
        <div id="signInDiv"></div>
        <div className="flex justify-center pt-5 text-sm">
          <span>
            Don't have an account?{' '}
            <Link to="/signup" className="underline text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
