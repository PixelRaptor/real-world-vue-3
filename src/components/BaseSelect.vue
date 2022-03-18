<template>
	<label> {{ label }}</label>
	<select
		class="field"
		v-bind="$attrs"
		:value="modelValue"
		@Change="$emit('update:modelValue', $event.target.value)"
	>
		<option
			v-for="option in options"
			:value="option"
			:key="option"
			:selected="option === modelValue"
		>
			{{ option }}
		</option>
	</select>
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
		options: {
			type: Array,
			required: true,
		},
	},
}
</script>
