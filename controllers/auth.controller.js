import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        //Alternativa buscando por email
        let user = await User.findOne({ email })

        if (user) throw ({ code: 11000 })

        user = new User({ email, password })
        await user.save();
        //jwt token

        return res.status(201).json({ ok: true })
    } catch (error) {
        console.log(error);
        //Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Este usuario ya esta resgistrado 😒😒' })
        }
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });

        if (!user)
            return res.status(403).json({ error: 'Contraseña o email equivocada 🥲' })

        const respPassword = await user.comparePassword(password)

        if (!respPassword)
            return res.status(403).json({ error: 'Contraseña o email equivocada 🥲' })

        //Se genera el token JWT 
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)

        return res.json({ ok: "Login", token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error del servidor 😱🔥' })
    }
}
