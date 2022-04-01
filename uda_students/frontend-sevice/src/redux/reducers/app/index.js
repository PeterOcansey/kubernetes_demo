const initialState = {
	students: [],
	isLoading: false,
	errorMessage: undefined,
};

export default function appReducer(state = initialState, action) {
	switch (action.type) {
		case "FETCH_STUDENTS":
			return { ...state, isLoading: true };
		case "FETCH_STUDENTS_SUCCESS":
			return { ...state, isLoading: false, students: [...action.payload] };
		case "FETCH_STUDENTS_FAILURE":
			return { ...state, isLoading: false };
		default:
			return state;
	}
}
