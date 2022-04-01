import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AddEditItem from "../modalViews/addEditItem";
import DeleteItem from "../modalViews/deleteItem";
import { hideModal } from "../../redux/actions/ui";
import { editStudentAsync, addStudentAsync } from "../../redux/actions/app";

const Modal = ({
	show,
	modalData,
	hideModal,
	addStudentAsync,
	editStudentAsync,
	isAdding,
	isEditing,
}) => {
	const [formInputs, setFormInputs] = useState({});

	useEffect(() => {
		if (modalData && modalData.action === "edit-student") {
			setFormInputs({
				name: modalData.name,
				course: modalData.course,
				country: modalData.country,
			});
		} else if (modalData && modalData.action === "add-student") {
			setFormInputs({
				name: "",
				course: "",
				country: "",
			});
		}
	}, [modalData]);

	const handleOnChangeName = (e) => {
		setFormInputs((val) => ({
			...val,
			name: e.target.value,
		}));
	};

	const handleOnChangeCourse = (e) => {
		setFormInputs((val) => ({ ...val, course: e.target.value }));
	};

	const handleOnChangeCountry = (e) => {
		setFormInputs((val) => ({ ...val, country: e.target.value }));
	};

	const handleAddButtonClicked = () => {
		if (modalData.action === "add-student") {
			let student = {
				name: formInputs.name,
				course: formInputs.course,
				country: formInputs.country,
			};
			addStudentAsync(student);
		} else if (modalData.action === "edit-student") {
			let student = {
				id: modalData.studentId,
				name: formInputs.name,
				course: formInputs.course,
				country: formInputs.country,
			};
			editStudentAsync(student);
		}
	};
	return (
		<Wrapper show={show}>
			{modalData ? (
				<Content>
					<Title>{modalData.title}</Title>
					{modalData.action === "add-student" || modalData.action === "edit-student" ? (
						<AddEditItem
							action={modalData.action}
							onActionClicked={handleAddButtonClicked}
							onChangeName={handleOnChangeName}
							onChangeCourse={handleOnChangeCourse}
							onChangeCountry={handleOnChangeCountry}
							data={formInputs}
							isAdding={isAdding}
							isEditing={isEditing}
						/>
					) : modalData.action === "delete-student" ? (
						<DeleteItem body={modalData.body} studentId={modalData.studentId} />
					) : (
						""
					)}
				</Content>
			) : (
				""
			)}

			<Backdrop
				onClick={() => {
					hideModal();
					setFormInputs({
						productName: "",
						productPrice: "",
					});
				}}
			/>
		</Wrapper>
	);
};

const mapStateToProps = (state) => {
	return {
		modalData: state.ui.modalData,
		errorMessage: state.app.errorMessage,
		isAdding: state.app.isAdding,
		isEditing: state.app.isEditing,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		hideModal: () => dispatch(hideModal()),
		addStudentAsync: (student) => dispatch(addStudentAsync(student)),
		editStudentAsync: (student) => dispatch(editStudentAsync(student)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

const Wrapper = styled.div`
	opacity: ${(props) => (props.show ? 1 : 0)};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const Backdrop = styled.div`
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 5;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	position: absolute;
	background-color: white;
	min-width: 50%;
	border-radius: 10px;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
	padding: 25px;
	z-index: 10;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`;

const Title = styled.h3``;
