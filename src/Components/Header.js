import React, { useEffect, useState, useCallback } from 'react';
import LogoBase from '../assets/sword.svg';
import styled from 'styled-components';
import DarkModeToggle from './Toggle';
import IndexedDB from '../helpers/IndexedDB';

const Logo = styled.img`
	width: 35px;
`;

const Nav = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: auto;
	padding: 0 20px;
	user-select: none;
	position: relative;
	height: 64px;
	border-bottom: 1px solid #eaeaea;
	transition: box-shadow 0.2s ease, background-color 0.2s ease;
	justify-content: space-between;
	background-color: ${(props) => props.theme.background};
`;
const NavbarWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 20px;
	height: 100%;
`;

const NavItem = styled.div`
	height: 100%;
	align-items: center;
	display: flex;
	margin: 0px 15px;
	transition: border 0.2s ease;
`;
const Title = styled.span`
	text-decoration: none;
	font-size: 15px;
	transition: color 0.2s ease;
	cursor: pointer;
	font-weight: 400;
	color: ${(props) => props.theme.text};
	font-size: 18px;
	&:hover {
		border-bottom: 1px solid white;
		padding-bottom: 5px;
	}
`;

const Text = styled.span`
	color: ${(props) => props.theme.text};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const HistoryOption = styled.div`
	position: relative;
	cursor: pointer;
`;

const PopoverWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 40px;
	z-index: 1;
	width: 250px;
	transform: translate(40%, 0px);
	border-radius: 15px;
	background: ${(props) => props.theme.backgroundDarker};
	box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
		0 30px 60px -30px rgba(0, 0, 0, 0.3),
		0 -18px 60px -10px rgba(0, 0, 0, 0.025);
	::before {
		position: absolute;
		z-index: -1;
		content: '';
		right: calc(50% - 10px);
		top: -10px;
		border-style: solid;
		border-width: 0 10px 10px 10px;
		border-color: transparent transparent
			${(props) => props.theme.backgroundDarker} transparent;
		transition-duration: 0.3s;
		transition-property: transform;
	}
`;
const WebIcon = styled.img`
	width: 15px;
	padding-right: 15px;
`;
const HistoryList = styled.ul`
	list-style-type: none;
	padding: 0;
`;
const Navbar = styled.div`
	width: 100%;
	height: 100%;
	align-items: center;
	display: flex;
	justify-content: flex-end;
	padding: 0px 10%;
`;
const HistoryItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	padding: 10px 10px;
	cursor: pointer;
	&:hover {
		background: ${(props) => props.theme.background};
	}
`;

const NavbarLogo = () => {
	return (
		<NavbarWrapper>
			<Logo width='30px' src={LogoBase} />
		</NavbarWrapper>
	);
};

const HistoryPopover = ({ articles, setSelectedArticle, isVisible }) => {
	if (!isVisible) return null;
	return (
		<PopoverWrapper>
			<HistoryList>
				{articles &&
					articles.map((article) => {
						return (
							<HistoryItem
								key={article.id}
								onClick={() => {
									setSelectedArticle(article);
								}}>
								<WebIcon src={'https://lifemathmoney.com/favicon.ico'} />
								<Text>{article.title}</Text>
							</HistoryItem>
						);
					})}
			</HistoryList>
		</PopoverWrapper>
	);
};

const Header = ({ setSelectedArticle }) => {
	const [articles, setArticles] = useState(null);
	const [isHistoryVisible, setHistoryVisible] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await IndexedDB.getAll();
			setArticles(response);
		}
		fetchData();
	}, [setArticles, setHistoryVisible]);

	const handleClick = useCallback(() => {
		setHistoryVisible(!isHistoryVisible);
	}, [isHistoryVisible]);

	const handleSelected = useCallback(
		(e) => {
			setSelectedArticle(e);
			setHistoryVisible(false);
		},
		[setHistoryVisible, setSelectedArticle]
	);

	return (
		<Nav>
			<NavbarLogo />
			<Navbar>
				<HistoryOption>
					<Title onClick={handleClick}>History</Title>
					<HistoryPopover
						articles={articles}
						setSelectedArticle={handleSelected}
						isVisible={isHistoryVisible}
					/>
				</HistoryOption>
			</Navbar>
			<DarkModeToggle />
		</Nav>
	);
};

export default Header;
