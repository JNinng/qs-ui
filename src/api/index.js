import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "/api";
const serverAddress = "http://192.168.0.105:8401";

export default {
	serverAddress,

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

	/**
	 * @param {String} url
	 * @param {Object} files
	 * @returns Promise
	 */
	async uploadImage(files) {
		var tokenName = localStorage.getItem("token"); // 从本地缓存读取tokenName值
		var tokenValue = localStorage.getItem("tokenValue"); // 从本地缓存读取tokenValue值
		var header = {
			"Content-Type": "multipart/form-data",
		};
		if (tokenName != undefined && tokenName != "") {
			header[tokenName] = tokenValue;
		}

		const data = new FormData();
		files = Array.from(files);
		for (let i = 0; i < files.length; i++) {
			data.append("files", files[i]);
		}

		var result;
		const that = this;
		await axios({
			method: "post",
			url: "/file/upload",
			header: header,
			data: data,
		})
			.then((res) => {
				result = res.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].url = that.serverAddress + result[i].url;
				}
			})
			.catch((err) => {
				console.log("api image err:" + err);
				return;
			});
		return result;
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
