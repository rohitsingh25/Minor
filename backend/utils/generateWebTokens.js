import jwt from 'jsonwebtoken';

const generateJsonWebToken = (id) => {
  console.log('sercet', `${process.env.JWT_SECRET}`);
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.TOKEN_LIFE });
};

export default generateJsonWebToken;
