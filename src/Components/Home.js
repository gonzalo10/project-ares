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
	@media only screen and (max-width: 600px) {
		padding: 5px;
	}
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
	padding: 15px 5px 15px 30px;
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
	@media only screen and (max-width: 600px) {
		max-height: 70vh;
	}
	max-height: 60vh;
	padding-top: 15px;
`;
const SummarizedText = styled.p`
	line-height: 1.8em;
	padding: 0px 25px 0px 0px;
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

const Button = styled.button`
	white-space: nowrap;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	padding: 0 14px;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	background: #fff;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	color: ${(props) => props.theme.yellow};
	background-color: ${(props) => props.theme.backgroundDarker};
	text-decoration: none;
	border: 1px solid ${(props) => props.theme.backgroundDarker};
	transition: all 0.15s ease;
	cursor: pointer;
	outline: none;
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
		if (error) {
			console.log(error);
			setSummaryError(error);
			return;
		}
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
			<SearchWrapper isLoading={isLoading} hasSummary={summary}>
				{!summary && (
					<Title>
						Summary <PrefixTitle>Magic</PrefixTitle>
					</Title>
				)}
				<SearchPositiones>
					{summary ? (
						<Button onClick={handleSearchClick}>New Search</Button>
					) : (
						<Search ref={urlInputRef} onKeyDown={handleKeyDown} />
					)}
				</SearchPositiones>
			</SearchWrapper>
			<ResultsWrapper>
				{isLoading && !summary && !summaryError && (
					<LoadingWrapper>
						<GridLoader color={'yellow'} />
						<LoadingLabel>
							<PrefixTitle>Working</PrefixTitle> the magic
						</LoadingLabel>
					</LoadingWrapper>
				)}
				{summaryError && <div>{summaryError}</div>}
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
