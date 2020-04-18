import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Search from './Search';
import Card from './Card';
import GridLoader from './Loaders/Grid';
const HomeWrapper = styled.div`
	height: calc(100% - 65px);
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const SearchWrapper = styled.div`
	height: ${(props) => (props.isLoading ? '20%' : '100%')};
	transition: height 1s ease-in-out;
	justify-content: center;
	display: flex;
	align-items: center;
	background: white;
	position: relative;
	border-bottom: 1px solid #eaeaea;
`;
const ResultsWrapper = styled.div`
	height: 100%;
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SearchPositiones = styled.div`
	position: absolute;
	bottom: 0;
	transform: translate(0px, 50%);
`;
const PrefixTitle = styled.span`
	color: ${(props) => props.theme.yellow};
`;
const SummarizedText = styled.span`
	white-space: pre-line;
	line-height: 2em;
`;
const LoadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const LoadingLabel = styled.span`
	margin: 10px;
`;
const CardContent = styled.div`
	padding: 30px;
	max-width: 700px;
`;
const Title = styled.span`
	border-bottom: 1px solid ${(props) => props.theme.yellow};
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 4px;
	font-size: 1.7rem;
	user-select: none;
`;
const Home = (props) => {
	const urlInputRef = useRef(null);
	const [summary, setSummary] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [articleText, setArticleText] = useState(null);
	useEffect(() => {}, []);

	const handleSearchUrl = useCallback(async (e) => {
		const urlValue = urlInputRef.current.value;
		setLoading(true);
		const response = await fetch('/api/extract', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: urlValue
			})
		});
		const { summary, text } = await response.json();
		setSummary(summary);
		setArticleText(text);
	}, []);
	const handleKeyDown = useCallback((e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			handleSearchUrl();
		}
	}, []);
	return (
		<HomeWrapper>
			<SearchWrapper isLoading={isLoading}>
				<Title>
					Summary <PrefixTitle>Magic</PrefixTitle>
				</Title>
				<SearchPositiones>
					<Search ref={urlInputRef} onKeyDown={handleKeyDown} />
				</SearchPositiones>
			</SearchWrapper>
			<ResultsWrapper>
				{isLoading && !summary && (
					<LoadingWrapper>
						<GridLoader color={'yellow'} />
						<LoadingLabel>
							<PrefixTitle>Working</PrefixTitle> the magic
						</LoadingLabel>
					</LoadingWrapper>
				)}
				{summary && (
					<Card>
						<CardContent>
							<SummarizedText>{summary}</SummarizedText>
						</CardContent>
					</Card>
				)}
			</ResultsWrapper>
		</HomeWrapper>
	);
};

export default Home;
