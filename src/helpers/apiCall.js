const API = (url, articleLanguage) => {
	return fetch('/api/extract', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: url,
			language: articleLanguage
		})
	}).then((response) => response.json());
};

export default API;
