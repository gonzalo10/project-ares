import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Search from './Search';
import Card from './Card';

const HomeWrapper = styled.div``;
const SearchWrapper = styled.div`
	height: 150px;
	justify-content: center;
	display: flex;
	align-items: center;
	background: white;
	position: relative;
`;
const ResultsWrapper = styled.div`
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 60vh;
`;
const SearchPositiones = styled.div`
	position: absolute;
	bottom: 0;
	transform: translate(0px, 50%);
`;
const PrefixTitle = styled.span`
	color: ${(props) => props.theme.yellow};
`;
const Title = styled.span`
	margin-top: 20px;
	border-bottom: 1px solid ${(props) => props.theme.yellow};
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 4px;
	font-size: 1.7rem;
	user-select: none;
`;

function Home() {
	const urlInputRef = useRef(null);
	const [summary, setSummary] = useState(null);
	const [articleText, setArticleText] = useState(null);
	useEffect(() => {}, []);

	const handleSearchUrl = useCallback(async (e) => {
		const urlValue = urlInputRef.current.value;
		console.log(urlValue);
		// const response = await fetch('/api/extract', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		url: urlValue
		// 	})
		// });
		// const { summary, text } = await response.json();
		// setSummary(summary);
		// setArticleText(text);
	}, []);
	const handleKeyDown = useCallback((e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			handleSearchUrl();
		}
	}, []);

	return (
		<HomeWrapper>
			<SearchWrapper>
				<Title>
					Summary <PrefixTitle>Magic</PrefixTitle>
				</Title>
				<SearchPositiones>
					<Search ref={urlInputRef} onKeyDown={handleKeyDown} />
				</SearchPositiones>
			</SearchWrapper>
			<Card>{summary}</Card>
			<ResultsWrapper />
		</HomeWrapper>
	);
}

export default Home;
