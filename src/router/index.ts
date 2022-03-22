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

const routes = [
	{
		path: "/",
		name: "EventList",
		component: EventList,
		props: (route: any) => ({ page: parseInt(route.query.page) || 1 }),
	},
	{
		path: "/events/:id",
		name: "EventLayout",
		props: true,
		component: EventLayout,
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

export default router