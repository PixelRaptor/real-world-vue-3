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
export default defineComponent({
	props: {
		id: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			event: {} as EventItem,
		}
	},
	created() {
		EventService.getEvent(this.id)
			.then((response) => {
				this.event = response.data
			})
			.catch((error) => {
				console.log(error)
				if (error.response && error.response.status == 404) {
					this.$router.push({
						name: "404Resource",
						params: { resource: "event" },
					})
				} else {
					this.$router.push({ name: "NetworkError" })
				}
			})
	},
})
</script>
