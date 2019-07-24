const MD5 = require('md5');
const URL_ENCODE = require('urlencode');
const axios = require('axios');

function make_url(queryText) {
	const BASE_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";
	const APPID = '20190629000312069';
	const KEY = 'BfOhnNxq5tyN5HouYtib';
	const SALT = 100;
	let need_sign_str = APPID + queryText + SALT + KEY;
	let SIGN = MD5(need_sign_str);
	let query_url_encode = URL_ENCODE(queryText);
	const URL_FINAL = `${BASE_URL}?q=${query_url_encode}&from=zh&to=en&appid=${APPID}&salt=${SALT}&sign=${SIGN}`;
	return URL_FINAL;
}


async function baidu_translate(queryText) {
	let url = make_url(queryText);
	let res = await axios(url);
	if (res.status == 200) {
		let result = []; // 最终的数据～A！
		console.log(res.status);
		let translate_results = res.data.trans_result;
		for (let i in translate_results) {
			result.push(translate_results[i].dst);
		}
		return result;

	}
}
module.exports = {
	baidu_translate
};