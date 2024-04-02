import logo from '../../assets/planpulse-logo.png'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa6'
import { MdOutlineFeedback } from 'react-icons/md'
const Footer = () => {
  return (
    <div
      className="mt-auto bg-secondary text-secondary_foreground dark:bg-dark_secondary dark:text-dark_foreground flex flex-row justify-between text-center py-5 "
    >
      <div className="ml-20">Learn</div>
      <div>
        <a href="" className='flex flex-row text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60 items-center'>
          <MdOutlineFeedback size={25}></MdOutlineFeedback>
          <p className='ml-1'>Send Feedback</p>
        </a>
      </div>
      <div>
        <p className="font-bold">Get in touch</p>
        <ul className="flex flex-row">
          <li className="m-2">
            <a
              href="https://github.com/Abebabee"
              target="_blank"
              className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60"
            >
              <FaGithub size={30}></FaGithub>
            </a>
          </li>
          <li className="m-2">
            <a
              href="https://www.linkedin.com/in/albin-fernstr%C3%B6m-218687265/"
              target="_blank"
              className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60r"
            >
              <FaLinkedin size={30}></FaLinkedin>
            </a>
          </li>
        </ul>
      </div>
      <div className="mr-10 flex items-center space-x-3 rtl:space-x-reverse object-cover">
        <img src={logo} alt="" className="h-10" />
        <span className="font-semibold">PlanPulse</span>
      </div>
    </div>
  )
}

export default Footer
