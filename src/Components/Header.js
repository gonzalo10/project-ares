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
	padding: 0 20px 0px 0px;
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
	padding: 0px 10px;
	height: 100%;
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

const NavbarItem = styled.div`
	padding: 0px 20px;
	position: relative;
	cursor: pointer;
`;

const PopoverWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 40px;
	z-index: 1;
	min-height: 50px;
	width: 250px;
	transform: translate(31%, 0px);
	border-radius: 15px;
	background: ${(props) => props.theme.backgroundDarker};
	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
		0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
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
	height: 100%;
	margin: auto;
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
`;
const HistoryItem = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	padding: 8px 20px;
	cursor: pointer;
	&:hover {
		background: ${(props) => props.theme.background};
	}
`;

const SettingsContent = styled.div``;

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
						const { id, favicon, title } = article;
						return (
							<HistoryItem
								key={id}
								onClick={() => {
									setSelectedArticle(article);
								}}>
								<WebIcon src={favicon} />
								<Text>{title}</Text>
							</HistoryItem>
						);
					})}
			</HistoryList>
		</PopoverWrapper>
	);
};

const SettingsPopover = ({ isVisible }) => {
	if (!isVisible) return null;
	return (
		<PopoverWrapper>
			<SettingsContent>Font Size</SettingsContent>
		</PopoverWrapper>
	);
};

const Header = ({ setSelectedArticle, updateDB, setDBUpdated }) => {
	const [articles, setArticles] = useState(null);
	const [isHistoryVisible, setHistoryVisible] = useState(false);
	const [isSettingsVisible, setSettingsVisible] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await IndexedDB.getAll();
			setArticles(response);
			setDBUpdated(false);
		}
		fetchData();
	}, [setArticles, setHistoryVisible, updateDB, setDBUpdated]);

	const handleHistoryClick = useCallback(() => {
		setHistoryVisible(!isHistoryVisible);
		setSettingsVisible(false);
	}, [isHistoryVisible, setHistoryVisible]);
	const handleSettingsClick = useCallback(() => {
		setSettingsVisible(!isSettingsVisible);
		setHistoryVisible(false);
	}, [isSettingsVisible, setSettingsVisible]);

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
				{/* <NavbarItem>
					<Title onClick={handleSettingsClick}>Settings</Title>
					<SettingsPopover
						articles={articles}
						setSelectedArticle={handleSelected}
						isVisible={isSettingsVisible}
					/>
				</NavbarItem> */}
				<NavbarItem>
					<Title onClick={handleHistoryClick}>History</Title>
					<HistoryPopover
						articles={articles}
						setSelectedArticle={handleSelected}
						isVisible={isHistoryVisible}
					/>
				</NavbarItem>
			</Navbar>
			<DarkModeToggle />
		</Nav>
	);
};

export default Header;
