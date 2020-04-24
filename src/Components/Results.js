import React, { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import GridLoader from './Loaders/Grid';
import arrowSvg from '../assets/down-arrow.svg';

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
	padding: 15px 5px 15px 5px;
	max-height: 80vh;
	@media only screen and (max-width: 600px) {
		max-width: 93vh;
	}
	max-width: 80vw;
	display: flex;
	flex-direction: column;
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
	height: 100%;
	padding-top: 15px;
`;

const ModalAnimation = styled.div`
	@keyframes moveUp {
		0% {
			transform: translateY(650px);
		}
		100% {
			transform: translateY(0);
		}
	}
	z-index: 0;
	transform: scale(1);
	animation: moveUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

const Text = styled.p`
	line-height: 1.8em;
	padding: 0px 25px 0px 25px;
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

const Button = styled.img`
	width: 8px;
	cursor: pointer;
	position: relative;
	filter: contrast(0);
	${({ isVisible }) => isVisible && 'transform: rotate(180deg);'}
`;

const ExtraInfoWrapper = styled.div`
	margin-top: -18px;
	z-index: 2;
`;

const ExtraInfoText = styled(Text)`
	background-color: ${(props) => props.theme.grey1};
	${(props) => !props.isVisible && 'display: none'};
`;

const ExtraInfo = ({ p }) => {
	const [isVisible, setVisible] = useState(false);
	return (
		<ExtraInfoWrapper>
			<Button
				onClick={() => setVisible(!isVisible)}
				src={arrowSvg}
				isVisible={isVisible}
			/>
			<ExtraInfoText isVisible={isVisible}>{p}.</ExtraInfoText>
		</ExtraInfoWrapper>
	);
};

const joinArticleTextLines = (article) => {
	const newStructure = [];
	const textArray = article.text.split('.');
	const filteredSentences = textArray.filter((sentence) => {
		console.log(sentence.trim().length);
		return sentence.trim().length > 1;
		return sentence !== '';
	});
	console.log({ filteredSentences });
	console.log({ text: article.text.split('\n\n') });
	const newArray = article.summary.map((p) => p.trim());
	for (let i = 0; i < filteredSentences.length; i++) {
		if (newArray.includes(filteredSentences[i].trim()))
			newStructure.push({ text: filteredSentences[i], isSummary: true });
		else newStructure.push({ text: filteredSentences[i], isSummary: false });
	}
	let itemsToDelete = [];
	for (let i = 0; i < newStructure.length; i++) {
		let prevI = i;
		while (!newStructure[i].isSummary && !newStructure[i + 1]?.isSummary) {
			newStructure[prevI].text += `.\n\n ${newStructure[i + 1]?.text}`;
			itemsToDelete.push(i + 1);
			i++;
		}
	}

	for (let i = 0; i < itemsToDelete.length; i++) {
		newStructure.splice(itemsToDelete[i] - i, 1);
	}
	return newStructure;
};

const ArticleText = ({ article }) => {
	const newStructure = joinArticleTextLines(article);
	return newStructure.map(({ text, isSummary }, index) => {
		if (isSummary) return <Text key={index}>{text}.</Text>;
		return <ExtraInfo key={index} p={text} />;
	});
};

const Results = ({
	isLoading,
	article = {},
	summaryError,
	handleTimeClick
}) => {
	return (
		<ResultsWrapper>
			{isLoading && !article.summary && !summaryError && (
				<LoadingWrapper>
					<GridLoader color={'yellow'} />
					<LoadingLabel>
						<PrefixTitle>Working</PrefixTitle> the magic
					</LoadingLabel>
				</LoadingWrapper>
			)}
			{summaryError && <div>{summaryError}</div>}
			{article.summary && (
				<ModalAnimation>
					<Card>
						<CardContent>
							<CardHeader>
								<ArticleTitle>{article && article.title}</ArticleTitle>
								<ReadingTime onClick={handleTimeClick}>
									{/* {summaryReadingTime} */}
								</ReadingTime>
							</CardHeader>
							<CardBody>
								<ArticleText article={article} />
							</CardBody>
						</CardContent>
					</Card>
				</ModalAnimation>
			)}
		</ResultsWrapper>
	);
};

export default Results;
