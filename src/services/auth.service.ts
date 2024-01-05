import { SignJWT, jwtVerify } from 'jose';
import { TextEncoder } from 'util';

const jwtSecret = process.env.JWT_SECRET;

const createToken = (id: string) => {
  return new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(jwtSecret));
};

const verifyToken = (token: string) => {
  return jwtVerify(token, new TextEncoder().encode(jwtSecret));
};

export { createToken, verifyToken };
