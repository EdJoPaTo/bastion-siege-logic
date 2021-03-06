import {EMOJI} from './emoji'
import {
	GamescreenContent,
	ListEntry
} from './gamescreen-type'

import {RegExpLike, generateRegex} from './helpers/regex'
import * as contentFilter from './helpers/content-filter'

const LIST_SIMPLE_REGEX = /^(👑|🔅|⚜)(.+)\s+(\S+)$/
const LIST_ALLIANCE_REGEX = /^(👑|🔅|⚜)(.+)\s+(\d+)🛡\s*(\d+ .+)?$/

export function ranking(content: string): GamescreenContent {
	if (contentFilter.starts(content, EMOJI.gold)) {
		return {
			type: 'rankingGold',
			list: readList(content, LIST_SIMPLE_REGEX)
		}
	}

	if (contentFilter.starts(content, EMOJI.wins)) {
		return {
			type: 'rankingWins',
			list: readList(content, LIST_SIMPLE_REGEX)
		}
	}

	if (contentFilter.starts(content, EMOJI.terra)) {
		return {
			type: 'rankingTerra',
			list: readList(content, LIST_SIMPLE_REGEX)
		}
	}

	if (contentFilter.starts(content, EMOJI.search)) {
		return {
			type: 'rankingSearch',
			list: readList(content, LIST_SIMPLE_REGEX)
		}
	}

	if (contentFilter.starts(content, EMOJI.karma)) {
		return {
			type: 'rankingKarma',
			list: readList(content, LIST_SIMPLE_REGEX)
		}
	}

	return {}
}

export function allianceMembers(content: string): GamescreenContent {
	if (contentFilter.startsAny(content, EMOJI.listLeader, EMOJI.listNormal, EMOJI.listYou)) {
		return {
			type: 'allianceMembers',
			list: readList(content, LIST_ALLIANCE_REGEX)
		}
	}

	return {}
}

function readList(content: string, regex: RegExpLike): ListEntry[] {
	const lines = content.split('\n')
		.filter(o => contentFilter.startsAny(o, EMOJI.listLeader, EMOJI.listNormal, EMOJI.listYou))

	const entries = lines
		.map(o => {
			const match = generateRegex(regex).exec(o)
			if (!match) {
				return undefined
			}

			const type = match[1]
			const name = match[2].trim()
			const value = match[3]
			const meta = match[4]

			if (meta) {
				return {type, name, value, meta}
			}

			return {type, name, value}
		})
		.filter(o => o) as ListEntry[]

	return entries
}
