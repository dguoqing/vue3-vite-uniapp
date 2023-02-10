import dayjs from 'dayjs'


//获取token
export function getToken() {
	return uni.getStorageSync('token')
}
//获取userINfo
export function getUserInfo() {
	return uni.getStorageSync('userInfo') || undefined
}

//检测数据是否为空
export function checkEmpty(param) {
	return param === '' || param === null || param === undefined
}
//校验手机号
export function checkPhone(phone) {
	return (/^1[3456789]\d{9}$/.test(phone))
}
//返回随机 【min, max) 的正整数
export function randomInt(max, min = 0) {
	return parseInt(String(Math.random() * (max - min) + min))
}
/**
 *
 * @param month  2020-08
 * @param start  开始或者结束
 */
export function getMonthInterval(month, start) {
	let date = ''
	if (!start) {
		date = dayjs(month).endOf('month').format('YYYY-MM-DD') + ' 23:59:59'
	} else {
		date = `${month}-01 :00:00:00`
	}
	return dayjs(date).valueOf()
}

//toast
// @ts-ignore
export function myToast(title, icon = 'none') {
	// #ifdef MP-ALIPAY
	uni.hideLoading()
	// #endif
	return uni.showToast({
		title,
		icon: icon
	})
}
// loading
export function myLoading(title, mask = true) {
	return uni.showLoading({
		title,
		mask: mask
	})
}
//sleep
export function sleep(interval) {
	return new Promise((resolve) => {
		setTimeout(resolve, interval);
	});
}
//parseParams

export function getUrlKey(url) {
	let params = {};
	let urls = url.split("?");
	let arr = urls[1].split("&");
	for (let i = 0, l = arr.length; i < l; i++) {
		let a = arr[i].split("=");
		params[a[0]] = a[1];
	}
	return params;
}




//校验密码
export function checkPassword(password) {
	return (/^[A-Za-z0-9]+$/.test(password))
}

/**
 * trim(str, pos)
 * 该方法可以去除空格，分别可以去除所有空格，两端空格，左边空格，右边空格，默认为去除两端空格
 * str <String> 字符串
 * pos <String> 去除那些位置的空格，可选为：both-默认值，去除两端空格，left-去除左边空格，right-去除右边空格，all-去除包括中间和两端的所有空格
 */
export function trim(str, pos = 'both') {
	if (pos == 'both') {
		return str.replace(/^\s+|\s+$/g, "");
	} else if (pos == "left") {
		return str.replace(/^\s*/, '');
	} else if (pos == 'right') {
		return str.replace(/(\s*$)/g, "");
	} else if (pos == 'all') {
		return str.replace(/\s+/g, "");
	} else {
		return str;
	}
}


/**
 * AES加密
 * @param {any} word 加密数据
 */
export const cryptoHexEncrypt = (key, iv, word) => {
	var mkey = CryptoJS.enc.Hex.parse(key);
	var miv = CryptoJS.enc.Hex.parse(iv);
	let src = CryptoJS.enc.Hex.parse(word)
	const encrypted = CryptoJS.AES.encrypt(src, mkey, {
		iv: miv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.ZeroPadding
	})
	const result = encrypted.ciphertext.toString();
	console.info('AES加密 ', 'key：', key, 'iv：', iv,
		'data：', word, 'result：', result);
	return result;
}

export const cryptoHexDecrypt = (key, iv, word) => {

	var mkey = CryptoJS.enc.Hex.parse(key);
	var miv = CryptoJS.enc.Hex.parse(iv);
	let src = CryptoJS.enc.Hex.parse(word)
	const decrypted = CryptoJS.AES.decrypt({
			ciphertext: src,
		},
		mkey, {
			mode: CryptoJS.mode.CBC,
			iv: miv,
			padding: CryptoJS.pad.ZeroPadding
		}
	);
	const result = decrypted.toString();
	console.info('AES解密 ', 'key：', key, 'iv：', iv,
		'data：', word, 'result：', result);
	//console.debug('AES-CBC key iv word result', key, iv, word, result)
	return result;
}

//DES加密
export const encryptByDES = (message, key) => {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString();
}

//DES解密
export const decryptByDES = (ciphertext, key) => {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var decrypted = CryptoJS.DES.decrypt({
		ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
	}, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var result_value = decrypted.toString(CryptoJS.enc.Utf8);
	return result_value;
}

//DES解密手机号
export const decryptUserInfoMobile = () => {
	var keyHex = CryptoJS.enc.Utf8.parse("YiXiuXiaoYuan@toplion2020");
	var decrypted = CryptoJS.DES.decrypt({
		ciphertext: CryptoJS.enc.Hex.parse(getUserInfo().mobile)
	}, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var result_value = decrypted.toString(CryptoJS.enc.Utf8);
	return result_value;
}

//DES解密单位名称
export const decryptUserInfoUnitName = () => {
	var keyHex = CryptoJS.enc.Utf8.parse("YiXiuXiaoYuan@toplion2020");
	var decrypted = CryptoJS.DES.decrypt({
		ciphertext: CryptoJS.enc.Hex.parse(getUserInfo().unitName)
	}, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var result_value = decrypted.toString(CryptoJS.enc.Utf8);
	return result_value;
}

//字符串展示脱敏处理
export const hideCode = (str, frontLen, endLen) => {
	let len = str.length - frontLen - endLen;
	let asterisk = '';
	for (let i = 0; i < len; i++) {
		asterisk += '*';
	}
	return str.substring(0, frontLen) + asterisk + str.substring(str.length - endLen);
};

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns {function(): void}
 */
export const debounce = (fn, delay) => {
	let timer = null //借助闭包
	return function() {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(fn, delay) // 简化写法
	}
}

