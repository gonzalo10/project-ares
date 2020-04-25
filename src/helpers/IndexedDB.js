import Dexie from 'dexie';

const schema =
	'++id, title, text, summary, description, favicon, top_image, image, url, minutesSaved';

const saveArticle = async ({
	title,
	text,
	summary,
	description,
	favicon,
	top_image,
	image,
	url,
	minutesSaved
}) => {
	const articlesDB = new Dexie('articlesDB');
	articlesDB.version(1).stores({
		articles: schema
	});
	await articlesDB.articles.add({
		title,
		text,
		summary,
		description,
		favicon,
		top_image,
		image,
		url,
		minutesSaved
	});
};

const getAll = async () => {
	const articlesDB = new Dexie('articlesDB');
	articlesDB.version(1).stores({
		articles: schema
	});
	return await articlesDB.articles.toArray();
};

export default { saveArticle, getAll };
