import React from 'react'
import { IconType } from 'react-icons'
interface NavItemProps {
  href?: string
  title?: string
  onClick?: () => void
  Icon?: IconType
}
const NavItem = ({ href, onClick, title, Icon }: NavItemProps) => {
  return (
    <button
      className="flex flex-col items-center justify-center m-4 w-10 h-10 text-light_primary_text dark:text-dark_primary_text hover:text-light_primary_text_hover dark:hover:text-dark_primary_text_hover"
      onClick={onClick}
    >
      <a href={href} className="">
        <span className="flex-1">{Icon && <Icon size={20} />}</span>
      </a>
    </button>
  )
}

export default React.memo(NavItem)
