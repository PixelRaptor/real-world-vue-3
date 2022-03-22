<template>
	<div class="events">
		<h4>{{ totalEvents }} Events For Good</h4>
		<EventCard v-for="event in events" :key="event.id" :event="event" />
		<router-link
			id="page-prev"
			:to="{ name: 'EventList', query: { page: page - 1 } }"
			rel="prev"
			v-if="page != 1"
		>
			Previous
		</router-link>
		<div>
			<span>
				<router-link
					v-for="page in totalPages"
					:key="page"
					:to="{ name: 'EventList', query: { page: page } }"
				>
					{{ page + " | " }}
				</router-link>
			</span>
		</div>
		<router-link
			id="page-next"
			:to="{ name: 'EventList', query: { page: page + 1 } }"
			rel="next"
			v-if="hasNextPage"
		>
			Next
		</router-link>
	</div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue"
import EventService from "@/services/EventService.js"
import { watchEffect } from "vue"
import { mapActions, mapGetters, mapMutations, mapState } from "vuex"

export default {
	name: "EventList",
	props: ["page"],
	components: {
		EventCard,
	},
	data() {
		return {
			events: null,
			// totalEvents: 0,
		}
	},
	created() {
		watchEffect(() => {
			this.events = null
			EventService.getEvents(2, this.page)
				.then((res) => {
					this.events = res.data
					this.$store.dispatch(
						"updateTotalEvents",
						res.headers["x-total-count"]
					)
				})
				.catch((erra) => {
					let wer = "something went wrong"
					this.$router.push({
						name: "NetworkError",
						params: { err: erra.response.status },
					})
				})
		})
	},
	methods: {},
	computed: {
		totalPages() {
			return Math.ceil(this.totalEvents / 2)
		},
		hasNextPage() {
			return this.page < this.totalPages
		},
		...mapGetters(["eventsCount"]),
		...mapState(["totalEvents"]),
	},
}
</script>

<style scoped>
.events {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
