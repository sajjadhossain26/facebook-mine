/**
 * Email validate
 */

export const isEmail = (email) => {
  return /^[a-z0-9-_\.]{1,}@[a-z0-9-]{1,}\.[a-z\.]{2,}$/.test(email);
};

/**
 * Mobile validate
 */

export const isMobile = (mobile) => {
  return /^(01|8801|\+8801)[0-9]{9}$/.test(mobile);
};

/**
 * Mobile validate
 */

export const isString = (data) => {
  return /^[a-z@\.]{1,}$/.test(data);
};

/**
 * Mobile validate
 */

export const isNumber = (number) => {
  return /^[0-9\+]{1,}$/.test(number);
};
