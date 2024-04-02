import React from 'react'

interface ButtonProps {
  title?: string
  onClick: () => void
  disabled?: boolean
}

const Button = ({ title, onClick, disabled = false }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90 font-medium rounded-lg text-sm px-5"
  >
    <a href="/">{title}</a>
  </button>
)

export default React.memo(Button)
