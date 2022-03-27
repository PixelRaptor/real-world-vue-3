import axios from "axios"
import { EventItem } from "../types"
// import { NProgress } from "nprogress"
// const yourModuleName = require("nprogress")
// const NProgress = yourModuleName

const apiClient = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

// apiClient.interceptors.request.use((config) => {
// 	NProgress.start()
// 	return config
// })

// apiClient.interceptors.response.use((response) => {
// 	NProgress.done()
// 	return response
// })

export default {
	getEvents(perPage: number, page: number) {
		return apiClient.get("/events?_limit=" + perPage + "&_page=" + page)
	},
	getAllEvents() {
		return apiClient.get("/events")
	},
	getEvent(id: number) {
		return apiClient.get("/events/" + id)
	},
	postEvent(event: EventItem) {
		return apiClient
			.post("/events/", event)
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				throw err
			})
	},
}
