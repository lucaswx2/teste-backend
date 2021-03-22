import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errorsHandlers/AppError';
import acl from '@config/acl';
import { Console } from 'node:console';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
  status: boolean;
  email: string;
}
export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;
  try {
    const decoded = verify(token, secret);
    const { sub, role, status, email } = decoded as ITokenPayload;
    request.user = {
      id: sub,
      role,
      status,
      email,
    };
    if (!request.user.status) {
      throw new AppError('User is disabled', 401);
    }
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
