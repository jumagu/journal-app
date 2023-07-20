import CryptoJS from "crypto-js";

export const generateSHA1 = (data) => {
  const hash = CryptoJS.SHA1(data);
  return hash.toString(CryptoJS.enc.Hex);
};