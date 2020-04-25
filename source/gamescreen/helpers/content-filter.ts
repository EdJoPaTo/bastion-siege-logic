import {EMOJI} from '../emoji'
import {GAMETEXT} from '../gametext'

export function starts(content: string, expected: string): boolean {
	return content.startsWith(expected)
}

export function includes(content: string, expected: string): boolean {
	return content.includes(expected)
}

export function ends(content: string, expected: string): boolean {
	return content.endsWith(expected)
}

export function startsAll(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].every(o => content.startsWith(o))
}

export function includesAll(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].every(o => content.includes(o))
}

export function endsAll(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].every(o => content.endsWith(o))
}

export function startsAny(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].some(o => content.startsWith(o))
}

export function includesAny(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].some(o => content.includes(o))
}

export function endsAny(content: string, first: string, second: string, ...more: readonly string[]): boolean {
	return [first, second, ...more].some(o => content.endsWith(o))
}

export function startsWithGametext(content: string, emojiSelector: string, gametextSelector: string, spaceSeperated: boolean): boolean {
	const emoji = EMOJI[emojiSelector]
	const space = spaceSeperated ? ' ' : ''
	const prefix = emoji + space
	const {en, ru} = GAMETEXT[gametextSelector]
	return startsAny(content, `${prefix}${en}`, `${prefix}${ru}`)
}
