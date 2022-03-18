import { createStore } from "vuex"

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
		todos: [
			{ id: 1, text: "wake", done: true },
			{ id: 2, text: "bath", done: false },
			{ id: 3, text: "eat", done: true },
			{ id: 4, text: "work", done: false },
		],
		events: [
			{ id: 1, title: "one", organizer: "..." },
			{ id: 2, title: "two", organizer: "..." },
			{ id: 3, title: "three", organizer: "..." },
			{ id: 4, title: "four", organizer: "..." },
		],
	},
	getters: {
		catLength(state) {
			return state.categories.length
		},
		doneTodos(state) {
			return state.todos.filter((todo) => todo.done)
		},
		activeTodosCount(state) {
			return state.todos.filter((todo) => todo.done).length
		},
		getEventById: (state) => (id) => {
			return state.events.find((event) => event.id === id)
		},
	},
	mutations: {},
	actions: {},
	modules: {},
})
