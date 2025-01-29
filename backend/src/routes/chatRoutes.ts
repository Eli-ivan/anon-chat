import express from 'express';
import { createChatRoom, sendMessage } from '../controllers/chatController';

const router = express.Router();

router.post('/create', createChatRoom);
router.post('/send', sendMessage);

export default router;