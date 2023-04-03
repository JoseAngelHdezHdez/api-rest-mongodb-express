
import jwt from 'jsonwebtoken'

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) {
            throw new Error('No Bearer')
        }

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next()
    } catch (error) {
        console.log(error)

        const tokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es valida ✒️❌",
            "jwt expired": "JWT expiro 😱",
            "invalid token": "Token no valido 😡",
            "jwt malformed": "Token no valido 😡",
            "No Bearer": "Utiliza formato Bearer 😒"
        };

        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] })
    }
}