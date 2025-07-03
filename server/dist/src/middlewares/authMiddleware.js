import jwt from 'jsonwebtoken';
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "authentication required. no token or bad token" });
    jwt.verify(token, process.env.JWT_SECRET || "jwt_secret", (err, user) => {
        if (err)
            return res.status(403).json({ message: "authenticated but does not have permission (forbidden)" });
        req.user = user;
        next();
    });
    res.status(200).json({ success: true });
}
export function isAuthority(req, res, next) {
    if (req.user.roleId !== 1)
        return res.sendStatus(403);
    next();
}
export function isOwner(req, res, next) {
    if (req.user.roleId !== 2)
        return res.sendStatus(403);
    next();
}
export function isTourist(req, res, next) {
    if (req.user.roleId !== 3)
        return res.sendStatus(403);
    next();
}
