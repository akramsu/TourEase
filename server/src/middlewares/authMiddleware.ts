import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({message: "authentication required. no token or bad token"});

  jwt.verify(token, process.env.JWT_SECRET || "jwt_secret", (err, user) => {
    if (err) return res.status(403).json({message: "authenticated but does not have permission (forbidden)"});
    (req as any).user = user;
    next();
  });

  res.status(200).json({success: true})
}

export function isAuthority(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user.roleId !== 1) return res.sendStatus(403);
  next();
}

export function isOwner(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user.roleId !== 2) return res.sendStatus(403);
  next();
}

export function isTourist(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user.roleId !== 3) return res.sendStatus(403);
  next();
}