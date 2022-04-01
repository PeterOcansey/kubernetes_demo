import { HTTP_GET_REQUEST } from "../../../services/http";

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
