import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Header from './Components/Header';
import logo from './assets/sword.svg';
import './App.css';

const Logo = styled.img`
	width: 250px;
`;

function App() {
	const urlInputRef = useRef(null);
	const [summary, setSummary] = useState(null);
	const [articleText, setArticleText] = useState(null);
	useEffect(() => {}, []);

	const handleSearchUrl = useCallback(async (e) => {
		const urlValue = urlInputRef.current.value;
		const response = await fetch('/api/extract', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: urlValue
			})
		});
		const { summary, text } = await response.json();
		setSummary(summary);
		setArticleText(text);
	}, []);

	return (
		<div>
			<Header />
			<div>
				<input ref={urlInputRef} placeholder='write article url' />
				<button onClick={handleSearchUrl}>Search</button>
				<div>summary</div>
				<p>{summary}</p>
				<div>text</div>
				<p>{articleText}</p>
			</div>
		</div>
	);
}

export default App;
