import React from 'react'

interface EditProfileProps {
  profileImage?: HTMLImageElement
  fullName?: string
  UserName?: string
  JobTitle?: string
  Organization?: string
  EmailAdress?: string
}

const EditProfile = ({
  profileImage,
  fullName,
  UserName,
  JobTitle,
  Organization,
  EmailAdress,
}: EditProfileProps) => (
  <div>
    <p></p>
  </div>
)

export default React.memo(EditProfile)
