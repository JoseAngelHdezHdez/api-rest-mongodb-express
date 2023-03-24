import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function(next){
    const user = this;

    if (!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next()
    } catch (error) {
        console.log(error);
        throw new Error('Fallo el hash de tu contraseña');
    }
});

userSchema.methods.comparePassword = async function(candidatePass) {
    return await bcryptjs.compare(candidatePass, this.password)
}

export const User = mongoose.model('User', userSchema);