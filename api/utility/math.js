/**
 * create a random number
 * @param {*} min
 * @param {*} max
 * @returns
 */

export const mathRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
