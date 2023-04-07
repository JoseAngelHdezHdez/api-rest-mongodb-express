import jwt from "jsonwebtoken"

export const generaterToken = (uid) => {
    const expiresIn = 60 * 230;
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn }
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developer'),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error)
    }
}

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es valida ✒️❌",
    "jwt expired": "JWT expiro 😱",
    "invalid token": "Token no valido 😡",
    "jwt malformed": "Token no valido 😡",
    "No Bearer": "Utiliza formato Bearer 😒"
};
