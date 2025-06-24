import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided or malformed' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
    const secretKey = 'abcd';
  
    try {
      const decoded = jwt.verify(token, secretKey);
      (req as any).user = decoded;
      next();
    } catch (err) {
      console.error("JWT Verify Error:", err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  }
  
