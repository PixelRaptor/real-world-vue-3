export const dateFormatter = {
	computed: {
		dateFilter(value: any) {
			return new Date(value).toLocaleDateString("en-US", {
				weekday: "short",
				year: "numeric",
				month: "long",
				day: "2-digit",
			})
		},
	},
}
