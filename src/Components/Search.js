import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/search.svg';

const Logo = styled.img`
	width: 20px;
	padding: 0px 1px 0px 15px;
`;

const InputWrapper = styled.div`
	background: #fff;
	display: flex;
	border: 1px solid #dfe1e5;
	border-radius: 24px;
	height: 44px;
	margin: 0 auto;
	width: 482px;
	${(props) =>
		props.isOpen &&
		'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}
	border-color: rgba(223, 225, 229, 0);
	box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const Input = styled.input`
	background-color: transparent;
	border: none;
	margin: 0;
	padding: 0;
	color: rgba(0, 0, 0, 0.87);
	word-wrap: break-word;
	outline: none;
	display: flex;
	flex: 100%;
	height: 34px;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 5px;
`;
const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	width: 482px;
	margin: auto;
`;

const Search = React.forwardRef((props, ref) => {
	return (
		<SearchWrapper onKeyDown={props.onKeyDown}>
			<InputWrapper>
				<Logo width='30px' src={SearchIcon} />
				<Input ref={ref} onChange={(e) => {}} placeholder='Url to summirze' />
			</InputWrapper>
		</SearchWrapper>
	);
});

export default Search;
