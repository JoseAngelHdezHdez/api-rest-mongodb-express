import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: false,
        index: {unique: true},
    },
    password: {
        type: String,
        required: true,
    }
});

export const User = model('user', userSchema);