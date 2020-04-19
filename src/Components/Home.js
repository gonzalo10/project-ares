import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import Results from './Results';
import Search from './Search';
import IndexedDB from '../helpers/IndexedDB';

const HomeWrapper = styled.div`
	height: calc(100% - 65px);
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const getAverageReadingTime = (words) => {
	const WPM = 200;
	const averageReadingTime = words.length / WPM;
	const minutes = Math.ceil(averageReadingTime);
	return `${minutes} min`;
};

const Home = () => {
	const urlInputRef = useRef(null);
	const [summary, setSummary] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [articleMeta, setArticleMeta] = useState(null);
	const [articleReadingTime, setArticleReadingTime] = useState(null);
	const [summaryReadingTime, setSummaryReadingTime] = useState(null);
	const [summaryError, setSummaryError] = useState(null);
	const [articleLanguage, setLanguage] = useState('en');

	const handleSearchUrl = async (e) => {
		const urlValue = urlInputRef.current.value;
		setLoading(true);
		const response = await fetch('/api/extract', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: urlValue,
				language: articleLanguage
			})
		});
		const { summary, error, ...rest } = await response.json();
		console.log({ summary, error, ...rest });

		if (error) return setSummaryError(error);

		IndexedDB.saveArticle({
			summary,
			text: rest.text,
			title: rest.title,
			image: rest.image,
			url: urlValue
		});
		const articleWords = rest.text.split(' ');
		const summaryWords = summary.split(' ');
		setArticleReadingTime(getAverageReadingTime(articleWords));
		setSummaryReadingTime(getAverageReadingTime(summaryWords));
		setSummary(summary.split('.'));
		setArticleMeta(rest);
	};

	const handleKeyDown = useCallback(
		(e) => {
			const { keyCode } = e;
			if (keyCode === 13) {
				handleSearchUrl();
				setSummary(null);
			}
		},
		[handleSearchUrl]
	);

	const handleTimeClick = useCallback((e) => {}, []);
	const handleSearchClick = useCallback((e) => {
		setSummary(null);
		setArticleMeta(null);
		setArticleReadingTime(null);
		setSummaryReadingTime(null);
		setSummary(null);
		setArticleMeta(null);
		setSummaryError(null);
		setLoading(null);
	}, []);

	return (
		<HomeWrapper>
			<Search
				ref={urlInputRef}
				isLoading={isLoading}
				summary={summary}
				handleSearchClick={handleSearchClick}
				handleKeyDown={handleKeyDown}
			/>
			<Results
				isLoading={isLoading}
				summary={summary}
				summaryError={summaryError}
				articleMeta={articleMeta}
				handleTimeClick={handleTimeClick}
				summaryReadingTime={summaryReadingTime}
			/>
		</HomeWrapper>
	);
};

export default Home;
