import React, { useState } from 'react';
import Header from './Components/Header';
import Body from './Components/Home';
import { useTheme } from './ThemeManager';
import { ThemeProvider } from 'styled-components';

const themes = {
	light: {
		primary: 'green',
		yellow: '#f0c419',
		yellowLight: '#f0c41938',
		background: '#fafafa',
		backgroundLight: 'white',
		backgroundDarker: 'white',
		text: '#222642',
		darkText: '#a5a4a4',
		grey1: '#e8e8e8',
		greyLight: '#eaeaea'
	},
	dark: {
		yellow: '#f0c419',
		yellowLight: '#f0c41938',
		greyLight: '#eaeaea',
		background: '#26242E',
		backgroundLight: '#363340',
		backgroundDarker: '#161625',
		text: 'white',
		darkText: '#a5a4a4',
		grey1: '#26242E'
	}
};

const App = () => {
	const [article, setArticle] = useState({});
	const [updateDB, setDBUpdated] = useState(false);
	const theme = useTheme();
	return (
		<ThemeProvider theme={themes[theme.mode] || themes.light}>
			<Header
				setSelectedArticle={setArticle}
				updateDB={updateDB}
				setDBUpdated={setDBUpdated}
			/>
			<Body
				article={article}
				setArticle={setArticle}
				setDBUpdated={setDBUpdated}
			/>
		</ThemeProvider>
	);
};

export default App;
