import bcrypt from "bcryptjs";
/**
 * Create a hash password
 */

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashpass = bcrypt.hashSync(password, salt);
  return hashpass;
};

/**
 * Match hash password
 */

export const passwordVerify = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
