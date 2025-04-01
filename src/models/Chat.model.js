import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Usuarios en el chat
        messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
