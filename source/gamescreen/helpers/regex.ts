import {Player, parsePlayer} from '../player'

export function getOptional(text: string, pattern: RegExp | string, group = 1): string | undefined {
	const regex = new RegExp(pattern)
	const match = regex.exec(text)
	if (!match) {
		return undefined
	}

	return match[group]
}

export function getOptionalNumber(text: string, pattern: RegExp | string, group = 1): number | undefined {
	const result = getOptional(text, pattern, group)
	if (result === undefined) {
		return undefined
	}

	return Number(result)
}

export function getStrict(text: string, pattern: RegExp | string, group = 1): string {
	const result = getOptional(text, pattern, group)
	if (!result) {
		throw new Error('not a match')
	}

	return result
}

export function getNumberStrict(text: string, pattern: RegExp | string, group = 1): number {
	const result = getStrict(text, pattern, group)
	return Number(result)
}

export function getPlayer(text: string, pattern: RegExp | string, group = 1): Player {
	const namePart = getStrict(text, pattern, group)
	return parsePlayer(namePart)
}
