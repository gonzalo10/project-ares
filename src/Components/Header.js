import React from 'react';
import LogoBase from '../assets/sword.svg';
import styled from 'styled-components';
import Toggle from './Toggle';

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

const Header = () => (
	<Nav>
		<MainNavbar></MainNavbar>
		<SubNavbar />
		<Toggle />
	</Nav>
);

export default Header;
