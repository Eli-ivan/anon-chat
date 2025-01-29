import React from 'react';
import ChatRoom from '../components/ChatRoom';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ChatRoom />
    </div>
  );
};

export default Home;