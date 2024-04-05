import { IoSend } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { addNewMessage, getMessages } from '../../../api/apiService';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../../../utils/authUtils';
import ChatBubble from './ChatBubble/ChatBubble';
import { Socket } from 'socket.io-client';

interface ChatProps {
  projectName?:string;
  projectId?: string;
  socket: Socket | null;
}

const Chat: React.FC<ChatProps> = ({ projectId, projectName, socket }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, [projectId]); // Fetch messages when projectId changes

  useEffect(()=>{
    if(!socket){
      return
    }
    
    socket.on('newMessageUpdated', (data)=>{
      console.log("Hej i newMessageUpdate")
      console.log(data);
      
      setMessages((prevMessages)=> [...prevMessages, data.newMessage])
    })
    return ()=>{
      socket.off('newMessage')
    }
  },[socket])
  const getUserId = () => {
    const token = Cookies.get('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      return typeof userId === 'string' ? userId : '';
    }
    return '';
  };

  const fetchMessages = async () => {
    try {
      if (projectId) {
        const messages = await getMessages(projectId);
        setMessages(messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSend = async () => {
    try {
      const newMessage = {
        date: new Date(),
        from: getUserId(),
        message: message,
      };
      if (projectId) {
        await addNewMessage(projectId, newMessage);
        
        socket?.emit('newMessage',{newMessage})

        setMessage('');
        // After sending a new message, fetch updated messages
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="fixed bottom-10 right-10 md:w-2/5 lg:w-1/5">
        <div className="p-3 rounded-lg rounded-br-none bg-secondary text-card_foreground dark:bg-dark_secondary dark:text-dark_foreground border-2 border-border_color dark:border-dark_border">
          <div className="flex flex-row justify-between w-full">
            <div className="">Group chat for: <span className='font-bold'>{projectName}</span></div>
          </div>
          <div className="w-full">
            <div className="rounded-lg p-2 mb-2 bg-card dark:bg-dark_card border-2 border-border_color dark:border-dark_border/80">
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg}/>
              ))}
            </div>
            <div className="flex flex-row justify-center w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-lg pl-2 mr-1 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button className="flex flex-row items-center rounded-lg p-1 px-2 bg-primary text-primary_foreground hover:bg-primary/90" onClick={handleMessageSend}>
                <IoSend />
                <p className="pl-1 font-bold">Send</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
