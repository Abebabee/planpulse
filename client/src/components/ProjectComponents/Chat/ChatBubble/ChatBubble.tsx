import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../../../utils/authUtils';
import { getUserData } from '../../../../api/apiService';
import profilePicture from '../../../../assets/default.png'

interface ChatBubbleProps {
  message: {
    timestamp: string;
    from: string;
    message: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const [userData, setUserData] = useState()
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>("");
  const currentUser = getUserIdFromToken(Cookies.get('token') || '');
  const isCurrentUser = message.from === currentUser;

  /*
  get img url from user with message.from

   */
  const getUserPicture = async ()=>{
    const data = await getUserData(message.from)
    //setUserData(data)
    setProfilePictureUrl(data.profilePictureUrl);
    setFullName(data.fullname);
  }
  getUserPicture()

  return (
    <div className={`flex flex-row mb-5 relative ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="absolute -bottom-4">
          <img
            src={profilePictureUrl ?'https://storage.cloud.google.com/planpulse-image-bucket/'+profilePictureUrl : profilePicture}
            alt={fullName?fullName : "hej"}
            title={fullName?fullName : "hej"}
            className="rounded-full"
            style={{ width: 35, height: 35 }}
          />
        </div>
      )}
      <div
        className={`p-2 ${isCurrentUser ? 'bg-primary text-white rounded-lg rounded-br-none mr-10' : 'bg-accent dark:bg-dark_muted/70 dark:text-foreground rounded-lg rounded-bl-none ml-10'} max-w-4/5`}
      >
        {message.message}
        <span className="text-xs text-gray-400 block">{message.timestamp}</span>
      </div>
      {isCurrentUser && (
        <div className="absolute -bottom-4 right-0">
          <img
            src={profilePictureUrl ?'https://storage.cloud.google.com/planpulse-image-bucket/'+profilePictureUrl : profilePicture}
            alt={"You"}
            title={"You"}
            className="rounded-full"
            style={{ width: 35, height: 35 }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
