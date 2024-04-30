import Message from "../models/Message.js";
import User from "../models/UserModels.js";


// Admin to all users
export const Admintoall = async (req, res) => {
    try {
        const { message } = req.body;

        const nonAdminUserIds = await User.find({ role: 0 }).select('_id');

        const newMessages = await Promise.all(nonAdminUserIds.map(async (userId) => {
            return await new Message({
                sender: req.user._id,
                recipient: userId,
                message: message
            }).save();
        }));

        res.status(201).send({
            success: true,
            message: "Message sent successfully to all users",
            newMessages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in sending message',
            error
        });
    }
};

// Admin to particular users 
export const Admintouser = async (req, res) => {
    try {
        const { message } = req.body;
        const {uid} = req.params;
        console.log(uid);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newMessage = await new Message({
            sender: req.user._id,
            recipient: uid,
            message: message
        }).save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully to user",
            newMessage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in sending message',
            error
        });
    }
};

// user to Admin 
export const usertoAdmin = async (req, res) => {
    try {
        const { message } = req.body;

        const AdminUserIds = await User.find({ role: 1 }).select('_id');

        const newMessages = await Promise.all(AdminUserIds.map(async (userId) => {
            return await new Message({
                sender: req.user._id,
                recipient: userId,
                message: message
            }).save();
        }));

        res.status(201).send({
            success: true,
            message: "Message sent successfully to Admin",
            newMessages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in sending message',
            error
        });
    }
};

//  get message for all users or Admin
export const getmessage = async (req, res) => {
    try {
        const messages = await Message.find({ recipient: req.user._id }).populate('sender', 'name email');


        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages: messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in retrieving messages',
            error
        });
    }
};




