<template>
	<button>{{ label }}</button>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: "Click Me",
		},
	},
}
</script>

<style></style>
