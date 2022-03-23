<template>
	<input
		@change="$emit('update:modelValue', $event.target.checked)"
		v-bind="$attrs"
		:checked="modelValue"
		class="field"
	/>
	<label>{{ label }}</label>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
	props: {
		label: {
			type: String,
			default: "",
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
})
</script>
