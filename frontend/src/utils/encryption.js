import CryptoJS from "crypto-js";

const SECRET_KEY = "15841cf7acfc11c56adba5f20b102b458dd704911c9110fe88c445e268957580";

export const encryptMessage = (message) => 
  CryptoJS.AES.encrypt(message, SECRET_KEY).toString();

export const decryptMessage = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || "[Decryption Failed]";
  } catch (error) {
    console.error("Decryption error:", error);
    return "[Decryption Error]";
  }
};