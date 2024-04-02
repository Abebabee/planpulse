import React from 'react'

interface TaskProps {
  title?: string
  src?: string
}

const Task = ({ title, src }: TaskProps) => (
  <li>
    <img src={src} alt="" />
    <a href="">{title}</a>
  </li>
)
export default React.memo(Task)
