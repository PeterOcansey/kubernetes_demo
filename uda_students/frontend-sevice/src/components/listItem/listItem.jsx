import React from "react";
import styled from "styled-components";

const ListItem = ({ name, country, course }) => {
	return (
		<Wrapper>
			<LeftPatch />
			<Details>
				<Info>
					<StudentName>{name}</StudentName>
					<StudentDetails>
						<b>Course:</b> {course} <br />
						<b>Nationality:</b> {country}
					</StudentDetails>
				</Info>
			</Details>
		</Wrapper>
	);
};

export default ListItem;

const Wrapper = styled.div`
	background-color: #fbfcf8;
	min-height: 95px;
	display: flex;
	flex-direction: row;
	width: 80%;
	padding-left: 20px;
	padding-right: 20px;
	position: relative;
	margin-bottom: 15px;
`;

const LeftPatch = styled.div`
	height: 100%;
	background-color: #2db3e4;
	width: 8px;
	position: absolute;
	top: 0;
	left: 0;
`;

const Details = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

const Info = styled.div``;

const StudentName = styled.p`
	font-weight: 600;
	font-size: 20px;
	margin-bottom: 10px;
`;

const StudentDetails = styled.p`
	margin-top: 5px;
`;
