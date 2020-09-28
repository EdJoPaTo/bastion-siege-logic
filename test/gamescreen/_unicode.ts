// eslint-disable-next-line @typescript-eslint/no-var-requires
const emojiTree = require('emoji-tree')

export function getUnicode(text: string): string[] {
	const result = []
	for (let i = 0; i < text.length; i++) {
		result.push(text.charCodeAt(i).toString(16))
	}

	return result
}

export function getEmojiInfo(text: string): ReadonlyArray<{type: string; text: string}> {
	return emojiTree(text)
}
