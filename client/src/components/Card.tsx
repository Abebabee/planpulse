import React, { ReactNode } from 'react'

interface CardProps {
  className?: string
  children?: ReactNode
}

const Card = ({ className, children }: CardProps) => {
  return <div className={className}>{children}</div>
}

export default React.memo(Card)
