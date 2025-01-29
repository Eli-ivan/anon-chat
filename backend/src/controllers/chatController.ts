import { Request, Response } from 'express';
import { createRoom, addMessage } from '../services/chatService';

export const createChatRoom = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const room = await createRoom(userId);
  res.json(room);
};

export const sendMessage = async (req: Request, res: Response) => {
  const { roomId, message } = req.body;
  const newMessage = await addMessage(roomId, message);
  res.json(newMessage);
};