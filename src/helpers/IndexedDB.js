import Dexie from 'dexie';

const saveArticle = async ({ summary, title, text, image }) => {
	const articlesDB = new Dexie('articlesDB');
	articlesDB.version(1).stores({
		articles: '++id, title, text, summary,image'
	});
	await articlesDB.articles.add({
		title,
		text,
		summary,
		image
	});
};

const getAll = async () => {
	const articlesDB = new Dexie('articlesDB');
	articlesDB.version(1).stores({
		articles: '++id, title, text, summary,image'
	});
	return await articlesDB.articles.toArray();
};

export default { saveArticle, getAll };
