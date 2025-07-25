import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || "jwt_secret";
export function generateToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}
export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
