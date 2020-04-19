import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/search.svg';

const Logo = styled.img`
	width: 20px;
	padding: 0px 1px 0px 15px;
	filter: contrast(0);
`;

const InputWrapper = styled.div`
	display: flex;
	border-radius: 24px;
	height: 44px;
	margin: 0 auto;
	width: 100%;
	border-color: rgba(223, 225, 229, 0);
	box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
	background-color: ${(props) => props.theme.backgroundDarker};
	color: ${(props) => props.theme.text};
	transition: background-color 0.2s linear;
`;

const Input = styled.input`
	background-color: transparent;
	border: none;
	margin: 0;
	padding-right: 20px;
	color: rgba(0, 0, 0, 0.87);
	word-wrap: break-word;
	outline: none;
	display: flex;
	flex: 100%;
	height: 34px;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 5px;
	color: ${(props) => props.theme.text};
	transition: background-color 0.2s linear;
	::placeholder {
		color: ${(props) => props.theme.text}fa;
	}
`;
const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	width: 40vw;
	max-width: 482px;
	margin: auto;
`;

const Search = React.forwardRef((props, ref) => {
	return (
		<SearchWrapper onKeyDown={props.onKeyDown} onClick={props.onClick}>
			<InputWrapper>
				<Logo width='30px' src={SearchIcon} />
				<Input ref={ref} onChange={(e) => {}} placeholder='Url to summirze' />
			</InputWrapper>
		</SearchWrapper>
	);
});

export default Search;
