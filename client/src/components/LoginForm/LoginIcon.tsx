import React from 'react'
import { IconType } from 'react-icons'

interface LoginIconProps {
  Icon?: IconType
}

const LoginIcon = ({ Icon }: LoginIconProps) => {
  return (
    <a
      href="#"
      className="shadow-lg h-14 w-20 rounded-md flex justify-center items-center hover:text-gray_icon_hover"
    >
      <span className="">{Icon && <Icon className="" size={20} />}</span>
    </a>
  )
}

export default React.memo(LoginIcon)
