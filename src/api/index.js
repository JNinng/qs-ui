import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "/api";

export default {
	serverAddress: "http://192.168.0.105:8300",

	/**
	 * @param {String} url
	 * @param {Object} data
	 * @returns Promise
	 */
	post(url, data) {
		var tokenName = localStorage.getItem("token"); // 从本地缓存读取tokenName值
		var tokenValue = localStorage.getItem("tokenValue"); // 从本地缓存读取tokenValue值
		var header = {
			"content-type": "application/x-www-form-urlencoded",
		};
		if (tokenName != undefined && tokenName != "") {
			header[tokenName] = tokenValue;
		}

		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url,
				header: header,
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
		var tokenName = localStorage.getItem("token"); // 从本地缓存读取tokenName值
		var tokenValue = localStorage.getItem("tokenValue"); // 从本地缓存读取tokenValue值
		var header = {
			"content-type": "application/x-www-form-urlencoded",
		};
		if (tokenName != undefined && tokenName != "") {
			header[tokenName] = tokenValue;
		}

		return new Promise((resolve, reject) => {
			axios({
				method: "get",
				url,
				header: header,
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
