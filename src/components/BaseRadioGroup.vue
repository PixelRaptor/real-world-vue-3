<template>
	<BaseRadio
		v-for="option in options"
		:key="option.value"
		:label="option.label"
		:value="option.value"
		:name="name"
		:modelValue="modelValue"
		@update:modelValue="$emit('update:modelValue', $event)"
	/>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseRadio from "@/components/BaseRadio.vue"
export default defineComponent({
	props: {
		options: {
			type: Object,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		modelValue: {
			type: [String, Number],
			required: true,
		},
	},
	components: {
		BaseRadio,
	},
})
</script>
