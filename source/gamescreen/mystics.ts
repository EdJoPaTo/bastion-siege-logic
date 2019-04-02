import {EMOJI} from './emoji'

import {inputTextCleanup} from './text-cleanup'

export interface MysticsText {
	dragon: string;
	undead: string;
}

export type Mystic = keyof MysticsText

export const MYSTICS: Mystic[] = [
	'dragon',
	'undead'
]

export const MYSTICS_TEXT_EN = {
	dragon: EMOJI.dragon + 'Dragon',
	undead: EMOJI.undead + 'Undead army'
}

export const MYSTICS_TEXT_RU = {
	dragon: EMOJI.dragon + 'Драконом',
	undead: `армией ${EMOJI.undead}Нежити`
}

export function isMystic(input: string): Mystic | false {
	const text = inputTextCleanup(input)

	for (const m of MYSTICS) {
		if (text === MYSTICS_TEXT_EN[m]) {
			return m
		}

		if (text === MYSTICS_TEXT_RU[m]) {
			return m
		}
	}

	return false
}
