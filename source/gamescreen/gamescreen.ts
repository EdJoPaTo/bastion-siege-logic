import {Gamescreen, GamescreenContent} from './gamescreen-type'

import * as battlereport from './gamescreen.battlereport'
import * as buildings from './gamescreen.buildings'
import * as castle from './gamescreen.castle'
import * as lists from './gamescreen.lists'
import * as others from './gamescreen.others'
import * as players from './gamescreen.players'

type Parser = (content: string) => GamescreenContent

const availableParser: readonly Parser[] = [
	battlereport,
	buildings,
	castle,
	lists,
	others,
	players
]
	.flatMap(o => Object.values(o) as Parser[])

export function parseGamescreenContent(content: string): GamescreenContent {
	for (const parser of availableParser) {
		const result = parser(content)

		if (Object.keys(result).length > 0) {
			return result
		}
	}

	return {}
}

export function parseGamescreen(content: string, unixTimestamp: number): Gamescreen {
	const ingameTimestamp = Math.floor(unixTimestamp / 60) * 60
	return {
		...parseGamescreenContent(content),
		timestamp: unixTimestamp,
		ingameTimestamp
	}
}
