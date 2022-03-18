<template>
	<div class="events">
		<h4>Events For Good{{ $route.query.page }}</h4>
		<EventCard v-for="event in events" :key="event.id" :event="event" />
		<router-link
			id="page-prev"
			:to="{ name: 'EventList', query: { page: page - 1 } }"
			rel="prev"
			v-if="page != 1"
		>
			Previous
		</router-link>
		<router-link
			v-for="links in totalPages"
			:key="links"
			:to="{ name: 'EventList', query: { page: links } }"
		>
			{{ links }}
		</router-link>
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

export default {
	name: "EventList",
	props: ["page"],
	components: {
		EventCard,
	},
	data() {
		return {
			events: null,
			totalEvents: 0,
		}
	},
	created() {
		watchEffect(() => {
			this.events = null
			EventService.getEvents(2, this.page)
				.then((res) => {
					this.events = res.data
					this.totalEvents = res.headers["x-total-count"]
				})
				.catch(() => {
					this.$router.push({ name: "NetworkError" })
				})
		})
	},
	computed: {
		totalPages() {
			return Math.ceil(this.totalEvents / 2)
		},
		hasNextPage() {
			return this.page < this.totalPages
		},
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
