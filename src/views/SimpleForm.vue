<template>
	<div>
		<h1>Create an event{{ user.name }}</h1>
		<ul>
			<p>{{ getEventById(2) }}</p>
			<p>{{ countPlusLocalState }}</p>
		</ul>
		<form @submit.prevent="sendIt">
			<BaseSelect
				v-model="event.category"
				:options="categories"
				label="Select a category"
			/>
			<h3>Name & describe your event</h3>
			<BaseInput v-model="event.title" label="Title" type="text" />
			<br />
			<BaseInput
				v-model="event.description"
				label="Description"
				type="text"
			/>
			<h3>Where is your event?</h3>
			<BaseInput v-model="event.location" label="Location" type="text" />
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
			<button type="submit">Submit</button>
		</form>
		<pre>{{ event }}</pre>
	</div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import BaseCheckbox from "@/components/BaseCheckbox.vue"
import BaseRadioGroup from "@/components/BaseRadioGroup.vue"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { mapState, mapGetters } from "vuex"

export default {
	data() {
		return {
			localCount: 2,
			event: {
				user: "",
				id: "",
				category: "",
				title: "",
				description: "",
				location: "",
				pets: 1,
				extras: {
					catering: false,
					music: false,
				},
			},
			petOptions: [
				{ label: "Yes", value: 1 },
				{ label: "No", value: 0 },
			],
		}
	},
	components: {
		BaseInput,
		BaseSelect,
		BaseCheckbox,
		BaseRadioGroup,
	},
	methods: {
		sendIt() {
			this.event.user = this.$store.state.user
			this.event.id = uuidv4()
			console.log("event:", this.event)
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
	},
	computed: {
		countPlusLocalState() {
			return this.$store.state.count + this.localCount
		},

		// catLength() {
		// 	return this.$store.getters.catLength
		// },
		// getEvent() {
		// 	return this.$store.getters.getEventById
		// },
		...mapState(["user", "categories"]),
		...mapGetters(["catLength", "getEventById"]),
	},
}
</script>
