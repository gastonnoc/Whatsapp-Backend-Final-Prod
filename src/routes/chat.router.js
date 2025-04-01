import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createChatController, getMessagesListFromChatController, sendMessageToChatController } from "../controllers/chat.controller.js";

const chatRouter = Router()

//crear canal
//Body: {name: 'general'}
//Headers: 'Authorization' : 'Bearer {authorization_token}' 
//Checkear que el usuario que quiera crear un canal este incluido como miembro en el workspace
chatRouter.post('/:chat_id', authMiddleware, createChatController)

//enviar mensajes

chatRouter.post('/:chat_id/messages', authMiddleware, sendMessageToChatController)

chatRouter.get('/:chat_id/messages', authMiddleware, getMessagesListFromChatController)

export default chatRouter