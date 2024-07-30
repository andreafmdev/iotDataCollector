import jwt from 'jsonwebtoken';

export interface UserToken extends jwt.JwtPayload {
    userId: number,
    email : string
  }