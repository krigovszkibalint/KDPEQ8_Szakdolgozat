const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Cím megadása kötelező'],
        maxlength: 64,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Leírás megadása kötelező']
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Fizetés megadása kötelező']
    },
    location: {
        type: String,
        trim: true,
        required: [true, 'Helyszín megadása kötelező']
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: ObjectId,
        ref: "JobType",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

}, {timestamps:true})

module.exports = mongoose.model("Job", jobSchema);