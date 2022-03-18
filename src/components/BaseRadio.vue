<template>
	<input
		type="radio"
		v-bind="$attrs"
		:value="value"
		:checked="modelValue == value"
		@Change="$emit('update:modelValue', value)"
	/>
	<label> {{ label }}</label>
</template>
<script>
export default {
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
}
</script>
