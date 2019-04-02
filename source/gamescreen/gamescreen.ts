import {Gamescreen} from './gamescreen-type'

import * as battlereport from './gamescreen.battlereport'
import * as buildings from './gamescreen.buildings'
import * as castle from './gamescreen.castle'
import * as others from './gamescreen.others'
import * as players from './gamescreen.players'

type Parser = (content: string) => Gamescreen

const availableParser: Parser[] = [
	battlereport,
	buildings,
	castle,
	others,
	players
]
	.map(o => Object.values(o))
	.reduce((arr, add: Parser[]) => arr.concat(add), [])

export function parseGamescreen(content: string): Gamescreen {
	for (const parser of availableParser) {
		const result = parser(content)

		if (Object.keys(result).length > 0) {
			return result
		}
	}

	return {}
}
