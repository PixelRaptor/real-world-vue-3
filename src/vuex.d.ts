import { ComponentCustomProperties } from "vue"
import { Store } from "@/vuex"

// declare module "@types/nprogress" {}
// declare module "nprogress" {}
declare module "@vue/runtime-core" {
	// declare your own store states
	interface State {
		count: number
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
