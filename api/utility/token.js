import jwt from "jsonwebtoken";

/**
 * Create JWT
 */

export const createToken = (payload, exp) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
  });

  return token;
};

/**
 * jwt verify
 */

export const tokenVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
