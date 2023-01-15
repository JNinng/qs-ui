import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "/api";

export default {
	/**
	 * @param {String} url
	 * @param {Object} data
	 * @returns Promise
	 */
	post(url, data) {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url,
				data: qs.stringify(data),
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	get(url, data) {
		return new Promise((resolve, reject) => {
			axios({
				method: "get",
				url,
				params: data,
			})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};
