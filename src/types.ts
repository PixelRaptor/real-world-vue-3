export interface EventItem {
	id: typeId
	category: string
	description: string
	location: string
	date: string
	time: string
	user: string[]
	title: string
	attendees: string[]
	pets: number
	extras: string[]
}

export interface EventCardItem {}

export type typeId = number | string
