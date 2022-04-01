import React, { useEffect } from "react";
import styled from "styled-components";
import StudentList from "./components/studentList/studentList";
import { connect } from "react-redux";
import { fetchStudentsAsync } from "./redux/actions/app/index.js";
import ClipLoader from "react-spinners/ClipLoader";

export function App({ isLoading, students, fetchStudentsAsync }) {
	useEffect(() => {
		fetchStudentsAsync();
	}, []);

	if (isLoading)
		return (
			<ClipLoader
				color='#2db3e4'
				loading={isLoading}
				size={50}
				css={{ position: "absolute", top: "50%", left: "50%" }}
			/>
		);

	return (
		<Wrapper>
			<Header>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<Logo src='/images/Udacity.png' />
					<h2>Uda Students Project</h2>
				</div>
			</Header>
			<StudentList students={students} />
		</Wrapper>
	);
}
const mapStateToProps = (state) => {
	return {
		isLoading: state.app.isLoading,
		students: state.app.students,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
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
