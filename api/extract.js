import extractor from 'unfluff';
import request from 'request';
module.exports = (req, res) => {
	let data;
	request(
		'https://lifemathmoney.com/dont-waste-your-life-an-open-letter-to-young-men/',
		function (err, res2, body) {
			data = extractor(body, 'en');
			console.log(data.text);
			res.status(200).send(`New value added to the table!, key=${data.text}`);
		}
	);
};
