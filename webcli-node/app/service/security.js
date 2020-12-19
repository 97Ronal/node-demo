'use strict';
const CryptoJS = require('crypto-js');
const JSEncrypt = require('node-jsencrypt');

// RSA加密
exports.RSAencrypted = function RSAencrypted(key) {
  const encrypted = new JSEncrypt();
  const pubKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGo/J8dzsau/NlJ9SjLS84Xl1z
  /eAuta3C4q+N4Kb97e4b6S9wVw0LaVPBjOx4gvhqhkc4SuWc1uKFE2UCK54vxg+C
  KN6dBfq2CtC2iTNnq5EKrgwpZFDLVe2F6xAKjAhoYh+FhFde/Mo85OAjH+e5hndX
  dhYPc4sDwHSmlDf98QIDAQAB
  -----END PUBLIC KEY-----`;
  encrypted.setPublicKey(pubKey);
  return encrypted.encrypt(key);
};

// 获取随机16位字符串
exports.randomString = function randomString() {
  const a = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let m = '';
  for (let i = 0; i < 16; i++) {
    m += a[Math.floor(Math.random() * 62)];
  }
  return m;
};

// AES加密
exports.encrypt = function encrypt(key, param) {
  const encrypted = CryptoJS.AES.encrypt(
    param,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

// AES解密
exports.decrypt = function decrypt(word, key) {
  const decrypted = CryptoJS.AES.decrypt(
    word,
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

// https://www.cnblogs.com/lz2017/p/8046816.html
