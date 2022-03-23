<template>
	<button>{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
	props: {
		label: {
			type: String,
			default: "Click Me",
		},
	},
})
</script>

<style></style>
