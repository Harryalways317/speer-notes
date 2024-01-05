import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services';
export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'auth token is missing' });
  }

  try {
    const decodedToken = await verifyToken(token);
    req.body.user = decodedToken.payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
