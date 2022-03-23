<template>
	<label> {{ label }}</label>
	<select
		class="field"
		v-bind="$attrs"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
	>
		<option
			v-for="(option, index) in options"
			:value="option"
			:key="index"
			:selected="option === modelValue"
		>
			{{ option }}
		</option>
	</select>
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
		options: {
			type: Array,
			required: true,
		},
	},
})
</script>
