import faunadb from 'faunadb';

const client = new faunadb.Client({
	secret: process.env.REACT_APP_FAUNADB_KEY
});
const q = faunadb.query;

const getAllArticles = client
	.query(q.Paginate(q.Match(q.Ref('indexes/all_articles'))))
	.then((response) => {
		console.log('response data', response.data);
		const notesRefs = response.data;

		const getAllProductDataQuery = notesRefs.map((ref) => {
			return q.Get(ref);
		});
		return client.query(getAllProductDataQuery).then((data) => data);
	})
	.catch((error) => console.warn('error', error.message));

const addNewUrl = (url) =>
	client
		.query(
			q.Create(q.Collection('articles'), {
				data: {
					url: url
				}
			})
		)
		.then((ret) => ret)
		.catch((err) => console.warn(err));

module.exports = {
	addNewUrl,
	getAllArticles
};
