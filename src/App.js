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
		greyLight: '#eaeaea'
	},
	dark: {
		primary: 'green',
		yellow: 'blue',
		yellowLight: '#f0c41938'
	}
};

function App() {
	const theme = useTheme();
	console.log(theme);
	return (
		<>
			<ThemeProvider theme={themes[theme.mode]}>
				<Header />
				<Body />
			</ThemeProvider>
		</>
	);
}

export default App;
