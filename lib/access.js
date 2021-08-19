/*
 * @Author: Vane
 * @Date: 2021-08-11 16:53:05
 * @LastEditTime: 2021-08-13 13:44:13
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \cli-vane\lib\access.js
 */

const { resolve, join } = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');

const confPath = '***';
const key = '****';
const iv = Buffer.from([
	0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
	0x0c, 0x0d, 0x0e, 0x0f,
]);

/**
 * AES是一种常用的对称加密算法，加解密都用同一个密钥.
 * 加密结果通常有两种表示方法：hex和base64
 */

// 加密
async function aesEncrypt(data) {
	const cipher = createCipher('aes192', key);
	let crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

// 解密
async function aesDecrypt(encrypted) {
	const decipher = createDecipher('aes192', key);
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

// 保存授权信息文件
async function saveAuthorized(data) {
	fs.ensureDirSync(confPath);
	fs.writeFileSync(
		join(confPath, '.authorized'),
		aesEncrypt(JSON.stringify(data))
	);
}

// 删除授权文件
async function deleteAuthorized() {
	fs.removeSync(join(confPath, '.authorized'));
}

// 判断授权文件是否存在
async function authorizedExists() {
	return fs.existsSync(join(confPath, '.authorized'));
}

// 获取授权文件解析信息
async function getAuthorized() {
	let ret = fs.readFileSync(join(confPath, '.authorized'), 'utf8');
	return JSON.parse(aesDecrypt(ret));
}

module.exports = {
	aesEncrypt,
	aesDecrypt,
	saveAuthorized,
	deleteAuthorized,
	authorizedExists,
	getAuthorized,
};
