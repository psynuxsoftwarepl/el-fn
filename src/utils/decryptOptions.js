import CryptoJS from "crypto-js";

const KEY = import.meta.env.VITE_PAYMENT_ENC_KEY;

if (!KEY || KEY.length !== 32) {
  throw new Error(
    "VITE_PAYMENT_ENC_KEY must be defined and 32 characters long."
  );
}

export function decryptOptions(encryptedData, ivHex) {
  try {
    const key = CryptoJS.enc.Utf8.parse(KEY);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    // Direct hex-to-WordArray conversion
    const encryptedWordArray = CryptoJS.enc.Hex.parse(encryptedData);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedWordArray },
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      throw new Error("Decryption produced empty result. Check key and IV.");
    }

    return JSON.parse(decryptedText);
  } catch (err) {
    console.error("Decryption failed:", err);
    throw new Error("Failed to decrypt payment options");
  }
}
