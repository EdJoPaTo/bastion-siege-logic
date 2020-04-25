export const NOT_ALLOWED_CHARS: readonly string[] = [
	// https://en.wikipedia.org/wiki/Zero-width_space
	'\u200B',
	// https://en.wikipedia.org/wiki/Zero-width_joiner
	'\u200D',
	// https://emojipedia.org/variation-selector-16/
	'\uFE0F'
]

export const ALTERNATIVE_SPACES: readonly string[] = [
	'\n',
	'\t',
	'\v'
]

export function inputTextCleanup(text: string): string {
	let output = text

	for (const entry of NOT_ALLOWED_CHARS) {
		output = output.replace(new RegExp(entry, 'g'), '')
	}

	for (const entry of ALTERNATIVE_SPACES) {
		output = output.replace(new RegExp(entry, 'g'), ' ')
	}

	return output
}
