import React from 'react';
import Header from './Components/Header';
import Body from './Components/Home';
import { useTheme } from './ThemeManager';
import { ThemeProvider } from 'styled-components';

const themes = {
	light: {
		primary: 'green',
		yellow: '#f0c419',
		yellowLight: '#f0c41938',
		greyLight: '#eaeaea',
		background: '#fafafa',
		backgroundLight: 'white',
		backgroundDarker: 'white',
		text: 'black'
	},
	dark: {
		yellow: '#f0c419',
		yellowLight: '#f0c41938',
		greyLight: '#eaeaea',
		background: '#26242E',
		backgroundLight: '#363340',
		backgroundDarker: '#161625',
		text: 'white'
	}
};

function App() {
	const theme = useTheme();
	return (
		<ThemeProvider theme={themes[theme.mode] || themes.light}>
			<Header />
			<Body />
		</ThemeProvider>
	);
}

export default App;
