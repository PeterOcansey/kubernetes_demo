import axios from "axios";

export const HTTP_GET_REQUEST = (
	url,
	successCallback,
	errorCallback,
	finallyCallback
) => {
	axios
		.get(url)
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err))
		.then(() => finallyCallback());
};

export const HTTP_POST_REQUEST = (
	url,
	body,
	successCallback,
	errorCallback,
	finallyCallback
) => {
	axios
		.post(url, body)
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err))
		.then(() => finallyCallback());
};

export const HTTP_PUT_REQUEST = (
	url,
	body,
	successCallback,
	errorCallback,
	finallyCallback
) => {
	axios
		.put(url, body)
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err))
		.then(() => finallyCallback());
};

export const HTTP_DELETE_REQUEST = (
	url,
	successCallback,
	errorCallback,
	finallyCallback
) => {
	axios
		.delete(url)
		.then((res) => successCallback(res))
		.catch((err) => errorCallback(err))
		.then(() => finallyCallback());
};
