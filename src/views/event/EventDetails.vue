<template>
	<p>{{ event.time }} on {{ dateFilter }} @ {{ event.location }}</p>
	<p>{{ event.description }}</p>
</template>

<script>
// <script lang="ts">
// import { defineComponent } from "vue"
import { dateFormatter } from "../../mixins"
export default {
	props: ["event"],
	// mixins: [dateFormatter],
	data() {
		return {
			author: {
				name: "John Doe",
				books: [
					"Vue 2 - Advanced Guide",
					"Vue 3 - Basic Guide",
					"Vue 4 - The Mystery",
				],
			},
		}
	},
	computed: {
		dateFilter() {
			return new Date(this.event.date).toLocaleDateString("en-US", {
				weekday: "short",
				year: "numeric",
				month: "long",
				day: "2-digit",
			})
		},
	},
}
</script>
