import React from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../../../utils/authUtils';

interface ChatBubbleProps {
  message: {
    from: string;
    message: string;
    timestamp: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const currentUser = getUserIdFromToken(Cookies.get('token') || '');
  const isCurrentUser = message.from === currentUser;

  return (
    <div className={`flex flex-row mb-5 relative ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <div className="absolute -bottom-4">
          <img
            src="https://placehold.jp/60x60.png"
            alt=""
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
            src="https://placehold.jp/60x60.png"
            alt=""
            className="rounded-full"
            style={{ width: 35, height: 35 }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
