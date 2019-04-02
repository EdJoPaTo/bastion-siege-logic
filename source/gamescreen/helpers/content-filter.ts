// TODO: require 1 expected? how?

export function starts(content: string, expected: string): boolean {
	return content.startsWith(expected)
}

export function includes(content: string, expected: string): boolean {
	return content.includes(expected)
}

export function ends(content: string, expected: string): boolean {
	return content.endsWith(expected)
}

export function startsAll(content: string, ...expected: string[]): boolean {
	return expected.every(o => content.startsWith(o))
}

export function includesAll(content: string, ...expected: string[]): boolean {
	return expected.every(o => content.includes(o))
}

export function endsAll(content: string, ...expected: string[]): boolean {
	return expected.every(o => content.endsWith(o))
}

export function startsAny(content: string, ...expected: string[]): boolean {
	return expected.some(o => content.startsWith(o))
}

export function includesAny(content: string, ...expected: string[]): boolean {
	return expected.some(o => content.includes(o))
}

export function endsAny(content: string, ...expected: string[]): boolean {
	return expected.some(o => content.endsWith(o))
}
