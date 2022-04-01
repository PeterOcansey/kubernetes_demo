import React from "react";
import styled from "styled-components";
import Button from "../button/button";
import { connect } from "react-redux";
import { hideModal, showModal } from "../../redux/actions/ui";
import { deleteStudentAsync } from "../../redux/actions/app";

const ListItem = ({ name, country, course, id, deleteStudentAsync, showModal }) => {
	return (
		<Wrapper data-testid='test_listItem'>
			<LeftPatch />
			<Details>
				<Info>
					<StudentName>{name}</StudentName>
					<StudentDetails>
						<b>Course:</b> {course} <br />
						<b>Nationality:</b> {country}
					</StudentDetails>
				</Info>
				<ButtonGroup>
					<Button
						onClick={() => {
							showModal({
								action: "edit-student",
								title: "Edit Student",
								studentId: id,
								name: name,
								course: course,
								country: country,
							});
						}}>
						Edit
					</Button>
					<Button
						onClick={() => {
							showModal({
								action: "delete-student",
								title: "Delete Record",
								body: `Are you sure you want to delete ${name}'s record?`,
								studentId: id,
							});
						}}>
						Delete
					</Button>
				</ButtonGroup>
			</Details>
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		showModal: (data) => dispatch(showModal(data)),
		// deleteStudentAsync: (entityId) => dispatch(deleteStudentAsync(entityId)),
	};
};

export default connect(null, mapDispatchToProps)(ListItem);

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

const ButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
`;

const StudentName = styled.p`
	font-weight: 600;
	font-size: 20px;
	margin-bottom: 10px;
`;

const StudentDetails = styled.p`
	margin-top: 5px;
`;
