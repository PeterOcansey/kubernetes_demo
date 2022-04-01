import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "./components/button/button.jsx";
import StundentList from "./components/studentList/studentList";
import { connect } from "react-redux";
import Modal from "./components/modal/modal.jsx";
import { showModal } from "./redux/actions/ui";
import { fetchStudentsAsync } from "./redux/actions/app/index.js";
import ClipLoader from "react-spinners/ClipLoader";

export function App({
	modalVisible,
	showModal,
	fetchStudentsAsync,
	isLoading,
	students,
}) {
	useEffect(() => {
		fetchStudentsAsync();
	}, []);

	if (isLoading)
		return (
			<ClipLoader
				color='#2db3e4'
				loading={isLoading}
				size={50}
				css={{ alignSelf: "center" }}
			/>
		);

	return (
		<Wrapper>
			<Modal show={modalVisible} />
			<Header>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Logo src='/images/Udacity.png' />
					<h2>Uda Students CMS</h2>
				</div>
				<Button
					onClick={() => showModal({ action: "add-student", title: "Add Student" })}>
					Add Item
				</Button>
			</Header>
			<StundentList students={students} />
		</Wrapper>
	);
}
const mapStateToProps = (state) => {
	return {
		modalVisible: state.ui.showModal,
		isLoading: state.app.isLoading,
		students: state.app.students,
		isAdding: state.app.isAdding,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showModal: (data) => dispatch(showModal(data)),
		fetchStudentsAsync: () => dispatch(fetchStudentsAsync()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.div``;

const Header = styled.nav`
	background: white;
	display: flex;
	flex-direction: row;
	width: 100%;
	padding-right: 10px;
	padding-left: 10px;
	align-items: center;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	margin-bottom: 20px;
	position: fixed;
	justify-content: space-between;
	z-index: 1;
`;

const Logo = styled.img`
	height: 100px;
	width: 180px;
	margin-right: 10px;
`;
