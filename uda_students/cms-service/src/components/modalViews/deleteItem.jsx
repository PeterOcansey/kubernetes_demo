import React from "react";
import styled from "styled-components";
import Button from "../button/button";
import { connect } from "react-redux";
import { deleteStudentAsync } from "../../redux/actions/app";
import { hideModal } from "../../redux/actions/ui";
import { ClipLoader } from "react-spinners";

const DeleteItem = ({
	body,
	studentId,
	deleteStudentAsync,
	hideModal,
	isLoading,
	...props
}) => {
	return (
		<Wrapper style={props.style}>
			<Message>{body}</Message>
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={() => hideModal()}>Cancel</Button>
				<Button
					onClick={() => {
						deleteStudentAsync(studentId);
					}}>
					{isLoading ? (
						<ClipLoader
							color='#2db3e4'
							loading={isLoading}
							size={30}
							css={{ alignSelf: "center" }}
						/>
					) : (
						"Delete"
					)}
				</Button>
			</div>
		</Wrapper>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.app.isLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteStudentAsync: (studentId) => dispatch(deleteStudentAsync(studentId)),
		hideModal: () => dispatch(hideModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem);

const Wrapper = styled.div``;

const Message = styled.p`
	font-weight: 600;
	font-size: 20px;
`;
