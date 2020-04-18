import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
	min-height: 100px;
	width: 100%;
	border: 1px solid transparent;
	border-radius: 10px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
	overflow: hidden;
`;
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Card = ({ children }) => (
	<Container>
		<CardWrapper>{children}</CardWrapper>
	</Container>
);

export default Card;
