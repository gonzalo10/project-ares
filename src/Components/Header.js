// import Link from 'next/link';
import React from 'react';
import LogoBase from '../assets/sword.svg';
import styled from 'styled-components';
// import { useRouter } from 'next/router';

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
	transition: box-shadow 0.2s ease;
	justify-content: space-between;
	background-color: white;
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
	transition: border 0.5s ease;
	border-bottom: 1px solid
		${(props) => (props.isActive ? 'black' : 'transparent')};
`;
const Title = styled.span`
	text-decoration: none;
	font-size: 15px;
	color: ${(props) => (props.isActive ? 'black' : 'grey')};
	transition: color 0.5s ease;
	cursor: pointer;
	font-weight: 400;
`;

const AvatarWrapper = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${(props) => props.theme.yellow};
`;

const routes = {
	overview: 'Summary',
	projects: 'Projects',
	integrations: 'Integrations',
	activity: 'Activity'
};

const MainNavbar = () => {
	return (
		<NavbarWrapper>
			<Logo width='30px' src={LogoBase} />
		</NavbarWrapper>
	);
};
const AvatarButton = () => {
	return <AvatarWrapper></AvatarWrapper>;
};
const SubNavbar = () => {
	// const router = useRouter();
	// const routeInUse = router.pathname.split('/')[1];
	return (
		<NavbarWrapper>
			{Object.keys(routes).map((route) => {
				const isActive = false;
				return (
					<NavItem isActive={isActive} key={route}>
						{/* <Link href={`/${route}`}> */}
						<Title isActive={isActive}>{routes[route]}</Title>
						{/* </Link> */}
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
		<AvatarButton />
	</Nav>
);

export default Header;
