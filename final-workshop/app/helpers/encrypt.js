import CryptoJS from "crypto-js";

export function encryptData(data, key = "123"){
    return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptData(encryptedData, key = "123"){
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}