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

<script lang="ts">
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue"
import EventService from "@/services/EventService"
import { EventItem } from "../types"
import { watchEffect, defineComponent } from "vue"
import { mapActions, mapGetters, mapMutations, mapState } from "vuex"
import store from "@/store/index"
import nProgress from "nprogress"

export default defineComponent({
	name: "EventList",
	props: ["page"],
	components: {
		EventCard,
	},
	beforeRouteEnter(routeTo: any, routeFrom: any, next: any) {
		store.dispatch("goGetEvents", [2, routeTo.query.page || 1]).then(() => {
			next()
		})
	},
	beforeRouteUpdate(routeTo: any, routeFrom: any, next: any) {
		store.dispatch("goGetEvents", [2, routeTo.query.page || 1]).then(() => {
			next()
		})
	},
	methods: {
		flushCom() {
			this.$router.go(0)
		},
		...mapActions(["goGetEvents"]),
	},
	computed: {
		totalPages() {
			type ComicUniverse = "Marvel" | "D.C"

			interface Hero {
				name: String
				age: Number
				activeAvenger: Boolean
				powers: String[]
				universe: ComicUniverse
			}

			let spiderman: Hero = {
				name: "Peter Parker",
				age: 17,
				activeAvenger: true,
				powers: ["wall crawl", "spider-sense"],
				universe: "Marvel",
			}

			type buttonType = "blue" | "blue2"
			let buttonStyle: buttonType = "blue2"
			return Math.ceil(this.totalEvents / 2)
		},
		hasNextPage() {
			return this.page < this.totalPages
		},
		...mapGetters(["eventsCount"]),
		...mapState(["totalEvents", "events"]),
	},
})
</script>

<style scoped>
.events {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
