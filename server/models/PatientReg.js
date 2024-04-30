import mongoose from 'mongoose';

const patientschema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhone: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },

})

const Patient = mongoose.model('Patients', patientschema);

export default Patient