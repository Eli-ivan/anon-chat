import { useState, useEffect } from 'react';
import axios from 'axios';

const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (message: string) => {
    await axios.post('/api/chat/send', { roomId: '1', message });
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    // Fetch initial messages
    axios.get('/api/chat/messages?roomId=1').then((response) => {
      setMessages(response.data);
    });
  }, []);

  return { messages, sendMessage };
};

export default useChat;