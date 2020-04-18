import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeManager } from './ThemeManager';
const currentTheme = localStorage.getItem('theme')
	? localStorage.getItem('theme')
	: null;

ReactDOM.render(
	<React.StrictMode>
		<ThemeManager>
			<App />
		</ThemeManager>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
