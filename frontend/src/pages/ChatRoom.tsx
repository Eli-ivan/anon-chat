import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  isAnonymous: boolean;
}

const ChatRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.emit('joinRoom', id);

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage && socket) {
      socket.emit('sendMessage', { roomId: id, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room: {id}</h1>
      <div className="bg-white shadow-md rounded p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.isAnonymous ? 'text-gray-600' : 'text-blue-600'}`}>
            {message.text}
          </div>
        ))}
