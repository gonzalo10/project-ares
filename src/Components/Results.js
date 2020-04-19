import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import GridLoader from './Loaders/Grid';

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
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	@media only screen and (max-width: 600px) {
		max-height: 70vh;
	}
	@media only screen and (max-height: 600px) {
		max-height: 60vh;
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
	opacity: 0.8;
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

const PrefixTitle = styled.span`
	color: ${(props) => props.theme.yellow};
`;

const Results = ({
	isLoading,
	summary,
	summaryError,
	articleMeta,
	handleTimeClick,
	summaryReadingTime
}) => {
	return (
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
	);
};

export default Results;
