import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        number: {
            type: String,
            required: true,
        },

        pincode: {
            type: String,
            required: true,
        },

        Package: {
            type: String,
            required: true,
        },

        test: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            default: "claim sent",
            enum: ["claim sent", "Samples collected", "Report in Progress", "Report completed", "Report cancelled"],
        },
    },
    { timestamps: true }
)

export default mongoose.model("Lab", labSchema);