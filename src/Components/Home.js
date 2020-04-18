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
	height: ${(props) =>
		props.isLoading ? (props.hasSummary ? '0px' : '20%') : '100%'};
	transition: height 1s ease-in-out, background-color 0.2s linear;
	justify-content: center;
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.backgroundLight};
	position: relative;
	border-bottom: 1px solid ${(props) => props.theme.greyLight};
`;
const ResultsWrapper = styled.div`
	height: 100%;
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.background};
	transition: background-color 0.2s linear;
`;
const SearchPositiones = styled.div`
	position: absolute;
	bottom: 0;
	transform: translate(0px, 50%);
`;
const PrefixTitle = styled.span`
	color: ${(props) => props.theme.yellow};
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
const Title = styled.span`
	color: ${(props) => props.theme.text};
	border-bottom: 1px solid ${(props) => props.theme.yellow};
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 4px;
	font-size: 1.7rem;
	user-select: none;
`;

const CardContent = styled.div`
	padding: 15px 30px 15px;
	max-width: 700px;
	color: ${(props) => props.theme.text};
	background-color: ${(props) => props.theme.backgroundDarker};
	transition: background-color 0.2s linear;
	position: relative;
`;
const CardHeader = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props) => props.theme.greyLight};
	margin: 0px 30px;
	padding: 0px 0px 15px;
	justify-content: center;
`;
const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	overflow: scroll;
	max-height: 60vh;
	padding-top: 15px;
`;
const SummarizedText = styled.p`
	line-height: 1.8em;
	margin: 0;
	margin-bottom: 12px;
	text-align: justify;
`;
const ArticleTitle = styled.span`
	text-align: center;
`;
const ReadingTime = styled.span`
	position: absolute;
	right: 20px;
	cursor: pointer;
	color: ${(props) => props.theme.darkText};
	&:hover::before {
		content: 'Original article  ';
		color: ${(props) => props.theme.text};
	}
	&:hover {
		color: ${(props) => props.theme.text};
	}
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
		const { summary, ...rest } = await response.json();
		const articleWords = rest.text.split(' ');
		const summaryWords = summary.split(' ');
		setArticleReadingTime(getAverageReadingTime(articleWords));
		setSummaryReadingTime(getAverageReadingTime(summaryWords));
		setSummary(summary.split('.'));
		setArticleMeta(rest);
	}, []);

	const handleKeyDown = useCallback(
		(e) => {
			const { keyCode } = e;
			if (keyCode === 13) {
				handleSearchUrl();
			}
		},
		[handleSearchUrl]
	);

	const handleTimeClick = useCallback((e) => {
		set;
	}, []);

	return (
		<HomeWrapper>
			<SearchWrapper isLoading={isLoading} hasSummary={summary}>
				{!summary && (
					<Title>
						Summary <PrefixTitle>Magic</PrefixTitle>
					</Title>
				)}
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
							<CardHeader>
								<ArticleTitle>{articleMeta && articleMeta.title}</ArticleTitle>
								<ReadingTime onClick={handleTimeClick}>
									{summaryReadingTime}
								</ReadingTime>
							</CardHeader>
							<CardBody>
								{summary.map(
									(par, index) =>
										par && <SummarizedText key={index}>{par}.</SummarizedText>
								)}
							</CardBody>
						</CardContent>
					</Card>
				)}
			</ResultsWrapper>
		</HomeWrapper>
	);
};

export default Home;
