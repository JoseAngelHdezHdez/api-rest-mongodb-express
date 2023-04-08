import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultEx = (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    next()
};

export const paramLinkValidator = [
    param("id", "Formato no valido (Express validator)").trim().notEmpty().escape( ),
    validationResultEx
];

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto").trim().notEmpty()
        .custom(async (value) => {
            try {
                if(!value.startsWith("https://")){
                    value = "https://" + value
                }

                await axios.get(value)

                return value
            } catch (error) {
                console.log(error)
                throw new Error("Not found longLink 404")
            }
        }),
    validationResultEx 
]; 

export const bodyRegisterValidator = [
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Maximo de 6 carácteres").trim().isLength({ min: 6 }),
    body('password', "Password incorrecto").custom((value, { req }) => {
        if (value !== req.body.repassword) {
            throw new Error('No coinciden las contraseñas');
        }
        return value;
    }),
    validationResultEx
];

export const bodyLoginValidator = [
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Maximo de 6 carácteres").trim().isLength({ min: 6 }),
    validationResultEx
];


