const translate = require('google-translate-api');
translate('学习', {
	from: 'en',
	to: 'zh-cn'
}).then(res => {
	console.log(res.text);
	//=> Ik spreek Nederlands!
	console.log(res.from.text.autoCorrected);
	//=> true
	console.log(res.from.text.value);
	//=> I [speak] Dutch!
	console.log(res.from.text.didYouMean);
	//=> false
}).catch(err => {
	console.error(err);
});