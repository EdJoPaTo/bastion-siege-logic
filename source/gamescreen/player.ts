import {inputTextCleanup} from './text-cleanup'
import {Mystic, isMystic} from './mystics'

/* eslint @typescript-eslint/no-require-imports: "warn" */
/* eslint @typescript-eslint/no-var-requires: "warn" */
const emojiRegex = require('emoji-tree/lib/emojiRegex')

export interface Player {
	name: string;
	mystic?: Mystic;
	alliance?: string;
	bonus?: string;
	achievements?: string;
}

const nameRegex = createNameRegex()
function createNameRegex(): RegExp {
	const emojiSource: string = (emojiRegex as RegExp).source
	const concatedNamePart = [
		// First part (negative karma, conquerer, halloween, …)
		`(${emojiSource}+)?`,
		// Achievements
		/(?:{([^}]+)})?/,
		// Alliance
		/(?:\[([^\]]+)\])?/,
		// Name
		/(.+)/
	]
		.map(o => o instanceof RegExp ? o.source : o)
		.join('')

	return new RegExp(concatedNamePart)
}

export function parsePlayer(input: string): Player {
	const text = inputTextCleanup(input)

	const mystic = isMystic(text)
	if (mystic) {
		return {
			name: text,
			mystic
		}
	}

	const match = nameRegex.exec(text)
	if (!match) {
		throw new Error('could not parse player')
	}

	const result = {
		bonus: match[1],
		achievements: match[2],
		alliance: match[3],
		name: match[4]
	}

	return result
}
