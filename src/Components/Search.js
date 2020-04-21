import React, { forwardRef } from 'react';
import styled from 'styled-components';

import SearchIcon from '../assets/search.svg';

const SearchWrapper = styled.div`
	height: ${(props) => (props.hasSummary || props.isLoading ? '0px' : '100%')};
	transition: height 1s ease-in-out, background-color 0.2s linear;
	justify-content: center;
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.backgroundLight};
	position: relative;
	border-bottom: 1px solid ${(props) => props.theme.greyLight};
`;

const SearchPositiones = styled.div`
	position: absolute;
	bottom: 0;
	transform: translate(0px, 50%);
`;
const PrefixTitle = styled.span`
	color: ${(props) => props.theme.yellow};
`;

const Title = styled.span`
	color: ${(props) => props.theme.text};
	border-bottom: 1px solid ${(props) => props.theme.yellow};
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 4px;
	font-size: 1.7rem;
	user-select: none;
`;

const Button = styled.button`
	white-space: nowrap;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	padding: 0 14px;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	background: #fff;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	color: ${(props) => props.theme.yellow};
	background-color: ${(props) => props.theme.backgroundDarker};
	text-decoration: none;
	border: 1px solid ${(props) => props.theme.backgroundDarker};
	transition: all 0.15s ease;
	cursor: pointer;
	outline: none;
`;

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
	margin-top: 3px;
	color: ${(props) => props.theme.text};
	transition: background-color 0.2s linear;
	::placeholder {
		color: ${(props) => props.theme.text}fa;
	}
`;
const Search = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	@media only screen and (max-width: 600px) {
		width: 90vw;
	}
	width: 50vw;
	max-width: 482px;
	margin: auto;
`;

const SearchComponent = forwardRef(
	({ summary, isLoading, handleSearchClick, handleKeyDown }, ref) => {
		console.log(!!summary);
		return (
			<SearchWrapper hasSummary={summary} isLoading={isLoading}>
				{!summary && !isLoading && (
					<Title>
						Summary <PrefixTitle>Magic</PrefixTitle>
					</Title>
				)}
				<SearchPositiones>
					{summary || isLoading ? (
						<Button onClick={handleSearchClick}>New Search</Button>
					) : (
						<Search onKeyDown={handleKeyDown}>
							<InputWrapper>
								<Logo width='30px' src={SearchIcon} />
								<Input
									ref={ref}
									onChange={(e) => {}}
									placeholder='Url to summirze'
								/>
							</InputWrapper>
						</Search>
					)}
				</SearchPositiones>
			</SearchWrapper>
		);
	}
);

export default SearchComponent;
