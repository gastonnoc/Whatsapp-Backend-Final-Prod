import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true, // Un mensaje siempre debe estar en un chat
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Un mensaje siempre debe tener un remitente
        },
        content: {
            type: String,
            required: true, // El contenido del mensaje no puede estar vacío
            trim: true, // Elimina espacios innecesarios al inicio y al final
        }
    },
    { timestamps: true } // Agrega automáticamente createdAt y updatedAt
);

// Crear y exportar el modelo de Mensaje
const Message = mongoose.model("Message", messageSchema);
export default Message;
