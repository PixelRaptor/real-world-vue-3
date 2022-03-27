import { createRouter, createWebHistory } from "vue-router"
import EventList from "../views/EventList.vue"
import EventLayout from "../views/event/EventLayout.vue"
import EventDetails from "../views/event/EventDetails.vue"
import EventRegister from "../views/event/EventRegister.vue"
import EventEdit from "../views/event/EventEdit.vue"
import AboutUs from "../views/AboutUs.vue"
import SimpleForm from "../views/SimpleForm.vue"
import NotFound from "../views/NotFound.vue"
import NetworkError from "../views/NetworkError.vue"
import nProgress from "nprogress"
import store from "@/store"

const routes = [
	{
		path: "/",
		name: "EventList",
		component: EventList,
		props: (route: any) => ({
			page: parseInt(route.query.page) || 1,
			events: [],
		}),
	},
	{
		path: "/events/:id",
		name: "EventLayout",
		props: true,
		component: EventLayout,
		beforeEnter(routeTo: any, routeFrom: any, next: any) {
			nProgress.start()
			store
				.dispatch("goGetEvent", routeTo.params.id)
				.then((event) => {
					nProgress.done()
					routeTo.params.event = event
					next()
				})
				.catch((error: any) => {
					nProgress.done()
					console.log(error)
					if (error.response && error.response.status == 404) {
						next({
							name: "404Resource",
							params: { resource: "event" },
						})
					} else {
						next({ name: "NetworkError" })
					}
				})
		},
		children: [
			{
				path: "",
				name: "EventDetails",
				component: EventDetails,
			},
			{
				path: "register",
				name: "EventRegister",
				component: EventRegister,
			},
			{
				path: "edit",
				name: "EventEdit",
				component: EventEdit,
			},
		],
	},
	{
		path: "/event/:afterEvent(.*)",
		redirect: (to: any) => {
			return { path: "/events/" + to.params.afterEvent }
		},
	},
	{
		path: "/about",
		name: "about",
		component: AboutUs,
	},
	{
		path: "/form",
		name: "EventForm",
		component: SimpleForm,
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: NotFound,
	},
	{
		path: "/404/:resource",
		name: "404Resource",
		component: NotFound,
		props: true,
	},
	{
		path: "/network-error/:err",
		name: "NetworkError",
		component: NetworkError,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
	nProgress.start()
	next()
})
router.afterEach((routeTo, routeFrom) => {
	nProgress.done()
})

export default router
