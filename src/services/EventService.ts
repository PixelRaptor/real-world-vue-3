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
	getEvents(perPage: number, page: number) {
		return apiClient.get("/events?_limit=" + perPage + "&_page=" + page)
	},
	getAllEvents() {
		return apiClient.get("/events")
	},
	getEvent(id: number) {
		return apiClient.get("/events/" + id)
	},
	postEvent(event: string) {
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
