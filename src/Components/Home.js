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
	const averageReadingTime = words / WPM;
	const minutes = Math.ceil(averageReadingTime);
	return minutes;
};

const getTimeSaved = (summary, text) => {
	const summaryWords = summary.split(' ').length;
	const textWords = text.split(' ').length;
	const wordSaved = textWords - summaryWords;
	return getAverageReadingTime(wordSaved);
};

const Home = ({ article, setArticle, setDBUpdated }) => {
	const urlInputRef = useRef(null);
	const [isLoading, setLoading] = useState(false);
	const [summaryError, setSummaryError] = useState(null);

	const handleSearchUrl = async (e) => {
		const urlValue = urlInputRef.current.value;
		setLoading(true);
		const response = await API(urlValue);
		const {
			summary,
			error,
			text,
			title,
			meta_img,
			top_image,
			meta_description,
			meta_favicon
		} = response;

		setLoading(false);
		if (error) return setSummaryError(error);

		const minutesSaved = getTimeSaved(summary, text);
		IndexedDB.saveArticle({
			summary: summary.split('.'),
			text,
			description: meta_description,
			favicon: meta_favicon,
			title,
			top_image,
			image: meta_img,
			url: urlValue,
			minutesSaved
		});
		setDBUpdated(true);
		setArticle({
			summary: summary.split('.'),
			text,
			title,
			minutesSaved,
			description: meta_description,
			top_image,
			image: meta_img
		});
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
