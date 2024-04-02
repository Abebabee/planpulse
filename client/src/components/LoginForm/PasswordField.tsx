import React, { ChangeEvent, useState } from 'react'
import { IconType } from 'react-icons'
import {
  FaRegEyeSlash,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaRegEye,
} from 'react-icons/fa'

interface PasswordProps {
  placeholder: string
  type: string
  title: string
  id: string
  Icon?: IconType
  value?:string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    value: string,
  ) => void
}
const PasswordField = ({
  placeholder,
  type,
  title,
  id,
  Icon,
  onChange,
}: PasswordProps) => {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPassword(newValue)

    if (onChange) {
      onChange(e, id, newValue)
    }
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {title}
      </label>
      <div className="relative">
        <input
          required={true}
          value={password}
          type={visible ? 'text' : 'password'}
          id={id}
          onChange={handleChange}
          className="block w-80 h-10 ps-5 text-sm border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={placeholder}
        />
        <div onClick={() => setVisible(!visible)}>
          {visible ? (
            <span className="absolute inset-y-0 end-2 flex items-center">
              {<FaRegEye className="" size={20} />}
            </span>
          ) : (
            <span className="absolute inset-y-0 end-2 flex items-center">
              {<FaRegEyeSlash className="" size={20} />}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(PasswordField)
