<template>
	<div v-if="event">
		<h1>{{ event.title }}</h1>
		<div>
			<router-link :to="{ name: 'EventDetails' }"> Details </router-link>
			<router-link :to="{ name: 'EventRegister' }">
				Register
			</router-link>
			<router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
		</div>
		<router-view :event="event" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { EventItem, typeId } from "../../types"
import EventService from "@/services/EventService"
import { mapActions, mapState } from "vuex"
import store from "@/store/index"
const yourModuleName = require("nprogress")
const NProgress = yourModuleName
export default defineComponent({
	props: {
		id: {
			type: Number,
			required: true,
		},
	},
	data() {
		// return {
		// 	event: {} as EventItem,
		// }
	},
	methods: {
		...mapActions(["goGetEvent"]),
	},
	computed: {
		...mapState(["event"]),
	},
	beforeRouteEnter(routeTo, routeFrom, next) {
		NProgress.start()
		console.log(routeTo, routeFrom, next, "hello")
		const id = routeTo.params.id
		store
			.dispatch("goGetEvent", routeTo.params.id)
			.then(() => {
				NProgress.done()
				next()
			})
			.catch((error) => {
				NProgress.done()
				console.log(error)
				if (error.response && error.response.status == 404) {
					next({
						name: "404Resource",
						params: { resource: "event" },
					})
				} else {
					next({ name: "NetworkError" })
				}
			})
	},
})
</script>
