import React, { useEffect, useState, useCallback } from 'react';
import LogoBase from '../assets/sword.svg';
import styled from 'styled-components';
import Toggle from './Toggle';
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
`;

const PopoverWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 40px;
	border: 1px solid;
	z-index: 1;
	width: 250px;
	transform: translate(50%, 0px);
	border-radius: 15px;
	background: ${(props) => props.theme.backgroundDarker};
`;
const WebIcon = styled.img`
	width: 15px;
	padding-right: 15px;
`;
const HistoryList = styled.ul`
	list-style-type: none;
	padding: 0;
`;
const History = styled.div`
	position: relative;
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

const routes = {
	overview: 'Summary'
};

const MainNavbar = () => {
	return (
		<NavbarWrapper>
			<Logo width='30px' src={LogoBase} />
		</NavbarWrapper>
	);
};

const SubNavbar = () => {
	return (
		<NavbarWrapper>
			{Object.keys(routes).map((route) => {
				const isActive = false;
				return (
					<NavItem isActive={isActive} key={route}>
						<Title isActive={isActive}>{routes[route]}</Title>
					</NavItem>
				);
			})}
		</NavbarWrapper>
	);
};

const HistoryPopover = ({ articles, setSelectedArticle }) => {
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
								<div>{article.title}</div>
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

	return (
		<Nav>
			<MainNavbar />
			<SubNavbar />
			<History onClick={handleClick}>
				History
				{isHistoryVisible && (
					<HistoryPopover
						articles={articles}
						setSelectedArticle={setSelectedArticle}
					/>
				)}
			</History>
			<Toggle />
		</Nav>
	);
};

export default Header;
