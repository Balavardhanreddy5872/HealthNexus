import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Accepted', 'Rejected', 'Pending'],
        default: 'Pending',
    },
})

const User = mongoose.model('doctorreg', userschema);

export default User