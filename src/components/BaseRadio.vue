<template>
	<input
		type="radio"
		v-bind="$attrs"
		:value="value"
		:checked="modelValue == value"
		@change="$emit('update:modelValue', value)"
	/>
	<label> {{ label }}</label>
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
			type: [String, Number],
			default: "",
		},
		value: {
			type: [String, Number],
			required: true,
		},
	},
})
</script>
