// import { User } from '../models/User.js';
import { generateRefreshToken, generaterToken } from '../utils/tokenManager.js';
import { User } from '../../express-mongodb/models/User.js'

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        //Alternativa buscando por email
        let user = await User.findOne({ email })

        if (user) throw ({ code: 11000 })

        user = new User({ email, password })
        await user.save();
        //Generar JWT
        const { token, expiresIn } = generaterToken(user.id);

        generateRefreshToken(user.id, res)
        
        return res.status(201).json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        //Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Este usuario ya esta resgistrado 😒😒' })
        }
        return res.status(500).json({ error: 'Error del servidor 😱🔥' })
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
        const { token, expiresIn } = generaterToken(user.id);

        generateRefreshToken(user.id, res)
        // Esta funcion "generaterToken(user.id)" regresa un objeto
        // return res.json(generaterToken(user.id));
        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error del servidor 😱🔥' });
    }
}

export const infoUser = async (req, res) => {
    try {
        const { email, _id } = await User.findById(req.uid).lean();
        return res.json({ email, _id })
    } catch (error) {
        return res.status(500).json({ error: 'Error del servidor 😱🔥' });
    }
}

export const refreshToken = (req, res) => {

    try {
        const { token, expiresIn } = generaterToken(req.uid);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error del servidor 😱🔥' });
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ ok: true })
}

