import express from "express";
import Message from "../models/Message.model.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { chat, content } = req.body;
        const sender = req.user._id; 

        if (!chat || !content) {
            return res.status(400).json({ message: "Chat ID y contenido son requeridos" });
        }

        const newMessage = new Message({ chat, sender, content });
        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        res.status(500).json({ message: "Error al enviar mensaje" });
    }
});

router.get("/:chatId", authMiddleware, async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message.find({ chat: chatId })
            .populate("sender", "username email")
            .populate("chat");

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
});

router.delete("/:messageId", authMiddleware, async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }

        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "No autorizado para eliminar este mensaje" });
        }

        await Message.findByIdAndDelete(messageId);
        res.status(200).json({ message: "Mensaje eliminado" });
    } catch (error) {
        console.error("Error al eliminar mensaje:", error);
        res.status(500).json({ message: "Error al eliminar mensaje" });
    }
});

export default router;
