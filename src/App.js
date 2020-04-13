import React from 'react';
import styled from 'styled-components';

import logo from './assets/sword.svg';
import './App.css';

const Logo = styled.img`
	width: 250px;
`;

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Logo src={logo} alt='logo' />
				<p>Project Ares</p>
			</header>
		</div>
	);
}

export default App;
