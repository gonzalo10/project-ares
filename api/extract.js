import extractor from 'unfluff';
import request from 'request';
import axios from 'axios';

const getSummary = (extractedWebText) =>
	axios
		.post('https://oahhq9qr2d.execute-api.us-east-1.amazonaws.com/dev', {
			text: extractedWebText
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return error;
		});

module.exports = (req, res) => {
	let data;
	const url = req.body.url;

	request(url, (err, nores, body) => {
		const extractedWebText = extractor(body, 'en');
		getSummary(extractedWebText.text).then((data) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ ...data, ...extractedWebText }));
		});
	});
};
