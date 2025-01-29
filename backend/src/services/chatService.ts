import db from '../utils/db';

export const createRoom = async (userId: string) => {
  const [room] = await db('chat_rooms').insert({ user_id: userId }).returning('*');
  return room;
};

export const addMessage = async (roomId: string, message: string) => {
  const [newMessage] = await db('messages').insert({ room_id: roomId, message }).returning('*');
  return newMessage;
};