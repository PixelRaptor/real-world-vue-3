<template>
	<div>
		<h1>Create an event</h1>
		<form @submit.prevent="sendIt">
			<BaseSelect
				@blur="v$.event.category.$touch"
				:class="{
					'input-error': v$.event.category.required.$invalid,
				}"
				v-model="event.category"
				:options="categories"
				label="Select a category"
			/>
			<p
				v-if="
					v$.event.category.required.$invalid &&
					v$.event.category.$dirty
				"
			>
				{{ v$.event.category.required.$message }}
			</p>
			<h3>Name & describe your event</h3>
			<BaseInput
				@blur="v$.event.title.$touch"
				:class="{
					'input-error': v$.event.title.required.$invalid,
				}"
				v-model="event.title"
				label="Title"
				type="text"
			/>
			<p v-if="v$.event.title.required.$invalid && v$.event.title.$dirty">
				{{ v$.event.title.required.$message }}
			</p>
			<br />
			<BaseInput
				@blur="v$.event.description.$touch"
				:class="{
					'input-error': v$.event.description.required.$invalid,
				}"
				v-model="event.description"
				label="Description"
				type="text"
			/>
			<p
				v-if="
					v$.event.description.$invalid && v$.event.description.$dirty
				"
			>
				{{ v$.event.description.required.$message }}
			</p>
			<h3>Where is your event?</h3>
			<BaseInput
				@blur="v$.event.location.$touch"
				:class="{
					'input-error': v$.event.location.required.$invalid,
				}"
				v-model="event.location"
				label="Location"
				type="text"
			/>
			<p
				v-if="
					v$.event.location.required.$invalid &&
					v$.event.location.$dirty
				"
			>
				{{ v$.event.location.required.$message }}
			</p>
			<h3>Are pets allowed?</h3>
			<div>
				<BaseRadioGroup
					name="pets"
					v-model="event.pets"
					:options="petOptions"
				/>
			</div>
			<h3>Extras</h3>
			<div>
				<BaseCheckbox
					v-model="event.extras.catering"
					label="Catering"
					type="checkbox"
				/>
			</div>
			<div>
				<BaseCheckbox
					v-model="event.extras.music"
					label="Live music"
					type="checkbox"
				/>
			</div>
			<!-- <p v-if="v$.">Please complete your form</p> -->
			<button :disabled="v$.$invalid" type="submit">Submit</button>
		</form>
		<pre>{{ event }}</pre>
	</div>
</template>

<script lang="ts">
import BaseInput from "@/components/BaseInput.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import BaseCheckbox from "@/components/BaseCheckbox.vue"
import BaseRadioGroup from "@/components/BaseRadioGroup.vue"
import axios from "axios"
import { defineComponent } from "vue"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
import { ADD_EVENT } from "../store/mutation-types"
import { EventItem } from "@/types"
import nProgress from "nprogress"
import useVuelidate from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"

export default defineComponent({
	setup() {
		return { v$: useVuelidate() }
	},
	data() {
		return {
			event: this.createFreshEventObject(),
			petOptions: [
				{ label: "Yes", value: 1 },
				{ label: "No", value: 0 },
			],
		}
	},
	validations: {
		event: {
			title: { required },
			description: { required },
			location: { required },
			category: { required },
		},
	},
	components: {
		BaseInput,
		BaseSelect,
		BaseCheckbox,
		BaseRadioGroup,
	},
	methods: {
		createFreshEventObject(): EventItem {
			const user = this.$store.state.user
			const id = Math.ceil(Math.random() * 100000000)
			const time = "14:30"
			const date = new Date()
			console.log(typeof new Date())
			console.log(date)

			return {
				id: id,
				category: "",
				description: "",
				location: "",
				date: date,
				time: time,
				user: user,
				title: "",
				attendees: [],
				pets: 1,
				extras: {
					catering: false,
					music: false,
				},
			}
		},
		add() {
			this.INCREMENT_COUNT(8)
		},
		sendIt() {
			this.v$.$touch()
			if (!this.v$.$invalid) {
				this.event.date = new Date()
				nProgress.start()
				this.$store
					.dispatch("createEvent", this.event)
					.then(() => {
						nProgress.done()
						this.$router.push({
							name: "EventDetails",
							params: { id: this.event.id },
						})
						this.createFreshEventObject()
					})
					.catch(() => {
						nProgress.done()
					})
			}
		},
		sendForm() {
			axios
				.post(
					"https://my-json-server.typicode.com/Code-Pop/Vue-3-Forms/events",
					this.event
				)
				.then((res) => {
					console.log(res.data)
				})
				.catch((err) => console.log(err))
		},
		...mapMutations(["addEvent", "INCREMENT", "INCREMENT_COUNT"]),
		// ...mapActions(["createEvent"]),
	},
	computed: {
		...mapState(["user", "categories", "count"]),
		...mapGetters(["catLength", "getEventById"]),
	},
})
</script>
