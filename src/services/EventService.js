import axios from "axios"

const apiClient = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})

export default {
	getEvents(perPage, page) {
		return apiClient.get("/events?_limit=" + perPage + "&_page=" + page)
	},
	getAllEvents() {
		return apiClient.get("/events")
	},
	getEvent(id) {
		return apiClient.get("/events/" + id)
	},
	postEvent(event) {
		return apiClient
			.post("/aevents/", event)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				throw err
			})
	},
}
