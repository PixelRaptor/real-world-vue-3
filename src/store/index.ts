import { createStore } from "vuex"
import {
	INCREMENT,
	INCREMENT_COUNT,
	ADD_EVENT,
	UPDATE_TOTAL_EVENTS,
} from "./mutation-types"
import EventService from "@/services/EventService"

export default createStore({
	state: {
		count: 4,
		user: { id: "abc123", name: "Bruce Wayne" },
		categories: [
			"sustainability",
			"nature",
			"animal welfare",
			"housing",
			"education",
			"food",
			"community",
		],
		events: [],
		totalEvents: 0,
	},
	getters: {
		getEventsList(state) {
			return state.events.filter(
				(event: any) => event.petsAllowed == true
			)
		},
		eventsCount(state) {
			return state.events.length
		},
		getEventById: (state) => (id: string) => {
			return state.events.find((event: any) => event.id === id)
		},
	},
	mutations: {
		[INCREMENT](state) {
			state.count++
		},
		[INCREMENT_COUNT](state, value) {
			state.count += value
		},
		[ADD_EVENT](state, event) {
			console.log(state.events)
		},
		[UPDATE_TOTAL_EVENTS](state, count) {
			state.totalEvents = count
		},
	},
	actions: {
		createEvent({ commit }, event) {
			return EventService.postEvent(event).then(() => {
				commit(ADD_EVENT, event)
			})
		},
		updateTotalEvents({ commit }, event) {
			commit(UPDATE_TOTAL_EVENTS, event)
		},
	},
	modules: {},
})
