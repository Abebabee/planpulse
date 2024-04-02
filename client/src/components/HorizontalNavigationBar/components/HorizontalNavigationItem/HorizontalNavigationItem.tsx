import React from 'react'
import { IconType } from 'react-icons'
import { Link, To } from 'react-router-dom'

interface HorizontalNavProps {
  href?: string
  title?: string
  onClick?: () => void
  Icon?: IconType
  toURL?: string
  avatar?: string
}

const NavItem = ({ href, onClick, title, Icon, toURL, avatar }: HorizontalNavProps) => {
  return (
    <button
      className="flex flex-col items-center justify-center m-4 w-10 h-10 text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60"
      onClick={onClick}
    >
      {toURL ? (
        <Link to={toURL}>
          <span className="flex-1 h-8 ">
          {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-full w-8 h-8 hover:opacity-80"
              />
            ) : (
              Icon && <Icon className="" size={30} />
            )}
          </span>
        </Link>
      ) : (
        <a href="#">
          {' '}
          <span className="flex-1 h-8 ">
            {Icon && <Icon className="" size={30} />}
          </span>
        </a>
      )}
    </button>
  )
}

export default React.memo(NavItem)
