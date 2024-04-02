import React from 'react'

interface ButtonProps {
  title?: string
  onClick: () => void
  disabled?: boolean
  href?: string
}

const Button = ({ title, onClick, disabled = false }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className=" font-medium text-sm px-5 w-80 h-10 mt-4 bg-primary text-primary_foreground dark:text-dark_primary_foreground hover:bg-primary/80"
  >
    <a href="#">{title}</a>
  </button>
)

export default React.memo(Button)
