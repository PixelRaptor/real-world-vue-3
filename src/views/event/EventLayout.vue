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
import { mapState } from "vuex"
export default defineComponent({
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
})
</script>
