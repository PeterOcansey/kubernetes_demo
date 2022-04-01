import React from "react";
import styled from "styled-components";

const CustomInput = ({ label, ...props }) => {
	return (
		<Wrapper>
			<label>{label}</label>
			<Input
				type='text'
				onChange={props.onChange}
				value={props.value}
				data-testid='test_customInput'
			/>
		</Wrapper>
	);
};

export default CustomInput;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 15px;
`;

const Input = styled.input`
	margin-top: 10px;
	border: 1px solid;
	border-radius: 5px;
	padding: 15px;
	font-size: 16px;

	:focus {
		outline-color: #2db3e4;
	}
`;
