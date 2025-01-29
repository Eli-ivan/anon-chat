import React, { useState } from 'react';
import useChat from '../hooks/useChat';

const ChatRoom: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;