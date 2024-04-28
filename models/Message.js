import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    recipient: {
        type: mongoose.ObjectId,
        ref: "users"
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
