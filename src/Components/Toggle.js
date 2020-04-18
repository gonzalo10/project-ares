import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';
import { useTheme } from '../ThemeManager';

const CheckBoxWrapper = styled.div`
	position: relative;
`;
const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 60px;
	height: 26px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 4px;
		background: #ffffff;
		transition: 0.2s;
	}
`;
const CheckBox = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 60px;
	height: 26px;
	&:checked + ${CheckBoxLabel} {
		background: #4fbe79;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 35px;
			transition: 0.2s;
			z-index: 2;
		}
	}
`;

const MoonIcon = styled.img`
	width: 17px;
	position: absolute;
	left: 6px;
	top: 4px;
`;
const SunIcon = styled.img`
	width: 20px;
	position: absolute;
	right: 12px;
	top: 3px;
`;

const isDark = ({ mode }) => {
	return mode === 'dark';
};

const Toggle = () => {
	const theme = useTheme();

	const handleChange = useCallback(() => {
		theme.toggle();
	});

	return (
		<CheckBoxWrapper>
			<CheckBox
				id='checkbox'
				type='checkbox'
				checked={isDark(theme)}
				onChange={handleChange}
			/>
			<CheckBoxLabel htmlFor='checkbox' />
			{isDark(theme) ? <MoonIcon src={moonIcon} /> : <SunIcon src={sunIcon} />}
		</CheckBoxWrapper>
	);
};

export default Toggle;
