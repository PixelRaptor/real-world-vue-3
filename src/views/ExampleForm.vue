<template>
	<form @submit.prevent="submit">
		<input
			type="email"
			placeholder="What's your email"
			v-model="email"
			@blur="v$.email.$touch"
		/>
		<div v-if="v$.email.$dirty">
			<p v-if="v$.email.email.$invalid">{{ v$.email.email.$message }}</p>
			<p v-if="v$.email.required.$invalid">
				{{ v$.email.required.$message }}
			</p>
		</div>
		<button :disabled="v$.$error" type="submit">Submit</button>
	</form>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import useVuelidate from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"

export default defineComponent({
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			email: "",
		}
	},
	validations: {
		email: {
			required,
			email,
		},
	},
	methods: {
		submit() {
			this.v$.$touch()
			if (!this.v$.$error) {
				console.log("sucess")
			} else {
				console.log("failed")
			}
		},
	},
})
</script>
