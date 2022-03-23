<template>
	<p>Register for the event here</p>
	<button @click="register">Register</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
	props: ["event"],
	methods: {
		register() {
			this.$router.push({ name: "EventDetails" })
		},
	},
})
</script>
