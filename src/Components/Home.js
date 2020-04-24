import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Results from './Results';
import Search from './Search';
import IndexedDB from '../helpers/IndexedDB';
import API from '../helpers/apiCall';
import axios from 'axios';

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

const Home = ({ article, setArticle }) => {
	const urlInputRef = useRef(null);
	const [isLoading, setLoading] = useState(false);
	const [summaryError, setSummaryError] = useState(null);

	const handleSearchUrl = async (e) => {
		const urlValue = urlInputRef.current.value;
		setLoading(true);
		const response = await API(urlValue);
		const { summary, error, text, title, image, ...rest } = response;
		setLoading(false);
		if (error) return setSummaryError(error);

		IndexedDB.saveArticle({
			summary: summary.split('.'),
			text,
			title,
			image,
			url: urlValue
		});

		setArticle({ summary: summary.split('.'), text, title });
	};

	const handleKeyDown = useCallback(
		(e) => {
			const { keyCode } = e;
			if (keyCode === 13) {
				handleSearchUrl();
			}
		},
		[handleSearchUrl]
	);

	const handleSearchClick = useCallback((e) => {
		setArticle({});
		setSummaryError(null);
		setLoading(null);
	}, []);

	useEffect(() => {
		const urlValue =
			'https://techcrunch.com/2020/04/21/8-top-fintech-vcs-discuss-covid-19-trends-signals-and-opportunities/';
		axios.get(urlValue).then((res) => {
			console.log(res);
		});
	}, []);

	return (
		<HomeWrapper>
			<Search
				ref={urlInputRef}
				isLoading={isLoading}
				summary={article.summary}
				handleSearchClick={handleSearchClick}
				handleKeyDown={handleKeyDown}
			/>
			<Results
				isLoading={isLoading}
				article={article}
				summaryError={summaryError}
			/>
		</HomeWrapper>
	);
};

export default Home;
