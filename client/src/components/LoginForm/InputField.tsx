import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
  placeholder: string
  type: string
  title: string
  id: string
  value:string
  Icon?: IconType
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
  placeholder,
  type,
  title,
  id,
  Icon,
  onChange,
}: InputProps) => {
  return (
    <div className='mb-1'>
      <label htmlFor={id} className="text-sm font-medium">
        {title}
      </label>
      <div className="relative">
        <input
          required={true}
          type={type}
          id={id}
          className="block w-80 h-10 ps-5 text-sm border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={placeholder}
          onChange={onChange}
        />
        <span className="absolute inset-y-0 end-2 flex items-center">
          {Icon && <Icon className="" size={20} />}
        </span>
      </div>
    </div>
  )
}
export default React.memo(InputField)
