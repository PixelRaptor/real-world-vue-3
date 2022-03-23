<template>
	<div>
		<h1>Create an event{{ user.name }}</h1>
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

export default defineComponent({
	data() {
		return {
			event: this.createFreshEventObject(),
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
		createFreshEventObject(): EventItem {
			const user = this.$store.state.user
			const id = Math.ceil(Math.random() * 100000000)
			const time = "14:30"
			const date = "23 May, 2022"

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
			this.$store
				.dispatch("createEvent", this.event)
				.then(() => {
					this.$router.push({
						name: "EventDetails",
						params: { id: this.event.id },
					})
					this.createFreshEventObject()
				})
				.catch(() => {})
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
