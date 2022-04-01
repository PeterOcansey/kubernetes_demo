import {
	HTTP_GET_REQUEST,
	HTTP_POST_REQUEST,
	HTTP_PUT_REQUEST,
	HTTP_DELETE_REQUEST,
} from "../../../services/http";
import { hideModal } from "../ui";

const fetchStudents = () => ({ type: "FETCH_STUDENTS" });

const fetchStudentsSuccess = (payload) => ({
	type: "FETCH_STUDENTS_SUCCESS",
	payload,
});

const fetchStudentsFailure = () => ({ type: "FETCH_STUDENTS_FAILURE" });

export function fetchStudentsAsync() {
	return (dispatch) => {
		dispatch(fetchStudents());

		HTTP_GET_REQUEST(
			"http://localhost:3006/cms/students",
			(res) => {
				dispatch(fetchStudentsSuccess(res.data.data));
			},
			(error) => {
				dispatch(fetchStudentsFailure());
			},
			() => {}
		);
	};
}

export function addStudentAsync(student) {
	return (dispatch) => {
		HTTP_POST_REQUEST(
			"http://localhost:3006/cms/student",
			student,
			(res) => {
				dispatch(hideModal());
				dispatch(fetchStudentsAsync());
			},
			(error) => {
				dispatch(hideModal());
			},
			() => {}
		);
	};
}

export function deleteStudentAsync(studentId) {
	return (dispatch) => {
		HTTP_DELETE_REQUEST(
			`http://localhost:3006/cms/students/${studentId}/delete`,
			(res) => {
				dispatch(hideModal());
				dispatch(fetchStudentsAsync());
			},
			(error) => {
				dispatch(hideModal());
			},
			() => {}
		);
	};
}

export function editStudentAsync(student) {
	return (dispatch) => {
		HTTP_PUT_REQUEST(
			`http://localhost:3006/cms/students/${student.id}/update`,
			{ name: student.name, country: student.country, course: student.course },
			(res) => {
				dispatch(hideModal());
				dispatch(fetchStudentsAsync());
			},
			(error) => {
				dispatch(hideModal());
			},
			() => {}
		);
	};
}
