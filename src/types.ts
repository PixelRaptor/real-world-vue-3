export interface EventItem {
	id: number
	category: string
	description: string
	location: string
	date: object
	time: string
	user: string[]
	title: string
	attendees: string[]
	pets: number
	extras: { catering: boolean; music: boolean }
}

export interface EventCardItem {}

export type typeId = number | string
