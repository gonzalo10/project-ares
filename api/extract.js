import extractor from 'unfluff';
import request from 'request';
import axios from 'axios';
import db from './db';

const mockLamda = () =>
	Promise.resolve({
		summary: `No matter what you want to do, if you want to stay consistent at it, you have to truly desire the outcomes your actions will bring.
			Inconsistency is simply a manifestation of a lack of real desire.
			To put it another way, how consistent you are is a representation of how intense your desire level for those outcomes is.
			Inconsistency is simply a lack of real desire (for the outcome).
			Just like a teenager who wants to be a famous rockstar but never actually learns to sing or dance or play an instrument or try to perform – you just like the idea of success in the arena you are inconsistent with, you do not have the real intensity of desire that would allow you to be utterly devoted to it.
			No other thing can sustainably force your body to move, to pursue something, to fully devote itself – only real desire can do that.
			And no, no one can give you desire – it has to come from you.
			`
	});
const MockSummary = () => {
	return mockLamda();
};
const getSummary = (extractedWebText, ratio) =>
	axios
		.post('https://oahhq9qr2d.execute-api.us-east-1.amazonaws.com/dev', {
			text: extractedWebText,
			ratio: ratio
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return error;
		});

module.exports = (req, res) => {
	const url = req.body.url;
	const language = req.body.language;
	// db.addNewUrl(url);
	axios
		.post('https://extractarticle.now.sh', {
			url: url
		})
		.then((result) => {
			const article = result.data[0];
			const articleText = article.text;
			if (articleText.length > 100000) {
				res.statusCode = 302;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ error: 'Text too long' }));
				return;
			}
			const WPM = 200;
			const articleWordLength = articleText.split(' ').length;
			let ratio = (WPM * 5) / articleWordLength;
			if (ratio < 0.2) ratio = 0.2;
			if (ratio > 1) ratio = 0.6;
			getSummary(articleText, ratio).then((summary) => {
				// setTimeout(() => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ ...summary, ...article }));
				// }, 1000);
			});
		});
};
