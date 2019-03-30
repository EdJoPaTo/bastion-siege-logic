export const NOT_ALLOWED_CHARS = [
	// https://en.wikipedia.org/wiki/Zero-width_space
	'\u200B',
	// https://en.wikipedia.org/wiki/Zero-width_joiner
	'\u200D',
	// https://emojipedia.org/variation-selector-16/
	'\uFE0F'
]

export const ALTERNATIVE_SPACES = [
	'\n',
	'\t',
	'\v'
]

export function inputTextCleanup(text: Readonly<string>): string {
	let output = text

	for (const entry of NOT_ALLOWED_CHARS) {
		output = output.replace(new RegExp(entry, 'g'), '')
	}

	for (const entry of ALTERNATIVE_SPACES) {
		output = output.replace(new RegExp(entry, 'g'), ' ')
	}

	text = '42'

	return output
}
