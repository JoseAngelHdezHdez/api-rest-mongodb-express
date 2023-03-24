import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body, } from 'express-validator'
import { validationResultEx } from '../middlewares/validationResultEx.js';

const router = Router();

router.post('/register', [
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Maximo de 6 carácteres").trim().isLength({ min: 6 }),
    body('password', "Password incorrecto").custom((value, { req }) => {
        if (value !== req.body.repassword) {
            throw new Error('No coinciden las contraseñas');
        }
        return value;
    })
],
validationResultEx,
register);
router.post('/login', [
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Maximo de 6 carácteres").trim().isLength({ min: 6 })
], 
validationResultEx,
login);


export default router; 