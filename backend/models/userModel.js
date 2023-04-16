const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['függőben', 'elfogadva', 'visszautasítva'],
        default: 'függőben'
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'Keresztnév megadása kötelező'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Vezetéknév megadása kötelező'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'E-mail cím megadása kötelező'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Kérem érvényes e-mail címet adjon meg'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Jelszó megadása kötelező'],
        minlength: [6, 'A jelszó legalább 6 karakterből kell álljon'],
    },

    jobsHistory: [jobsHistorySchema],

    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

//encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// check user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}



module.exports = mongoose.model("User", userSchema);
