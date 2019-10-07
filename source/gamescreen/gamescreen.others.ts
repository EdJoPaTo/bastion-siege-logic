import {EMOJI} from './emoji'
import {parsePlayer} from './player'
import {
	BattleAlliance,
	BattleSolo,
	DomainStats,
	Effect,
	GamescreenContent
} from './gamescreen-type'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

const EFFECTS_REGEX = /(.+) -\s+([^.]+)\./
export function effects(content: string): GamescreenContent {
	if (!contentFilter.includesAny(content, 'Will last until: ', 'Will continue: ', 'Продлится до: ', 'Продлится еще: ')) {
		return {}
	}

	const lines = content.split('\n')

	const effects: Effect[] = lines
		.map(line => {
			const effect: Effect = {
				emoji: regexHelper.getStrict(line, EFFECTS_REGEX, 1),
				name: regexHelper.getStrict(line, EFFECTS_REGEX, 2)
			}

			const minutesRemaining = regexHelper.getOptionalNumber(line, /: (\d+) [^.]+\./)
			const timestampString = regexHelper.getOptional(line, /(\d[\d-: ]+ \+0000 UTC)/)

			if (timestampString) {
				effect.timestamp = Date.parse(timestampString) / 1000
			} else if (minutesRemaining) {
				effect.minutesRemaining = minutesRemaining
			}

			return effect
		})

	return {effects}
}

interface WarRegex {
	name: RegExp;
	attack: RegExp;
	defence: RegExp;
}

const WAR_REGEX_ENGLISH: WarRegex = {
	name: /Continues the battle with (.+)/,
	attack: /Attack: (.+)/,
	defence: /Defence: (.+)/
}

const WAR_REGEX_RUSSIAN: WarRegex = {
	name: /Продолжается бой с (.+)/,
	attack: /Атака: (.+)/,
	defence: /Защита: (.+)/
}

export function war(content: string): GamescreenContent {
	const isEnglish = contentFilter.starts(content, 'Wins')
	const isRussian = contentFilter.starts(content, 'Победы')
	if (!(isEnglish || isRussian)) {
		return {}
	}

	const result: GamescreenContent = {
		type: 'war',
		domainStats: getWarMenuDomainStats(content)
	}

	const warRegex = isEnglish ? WAR_REGEX_ENGLISH : WAR_REGEX_RUSSIAN
	const battle = getWarBattle(content, warRegex)
	if (battle) {
		result.battle = battle
	}

	return result
}

function getWarMenuDomainStats(content: string): DomainStats {
	return {
		karma: regexHelper.getOptionalNumber(content, `(-?\\d+)${EMOJI.karma}`) || 0,
		terra: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.terra}`) || 0,
		wins: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.wins}`) || 0
	}
}

function getWarBattle(content: string, warRegexps: WarRegex): BattleAlliance | BattleSolo | undefined {
	const attack = regexHelper.getOptional(content, warRegexps.attack)
	const defence = regexHelper.getOptional(content, warRegexps.defence)

	if (attack && defence) {
		const battleAlliance: BattleAlliance = {
			attack: attack.split(', '),
			defence: defence.split(', ')
		}
		return battleAlliance
	}

	const namePart = regexHelper.getOptional(content, warRegexps.name)
	if (namePart) {
		const battleSolo: BattleSolo = {
			enemy: parsePlayer(namePart)
		}
		return battleSolo
	}

	return undefined
}

export function getPatrolreport(content: string): GamescreenContent {
	if (contentFilter.startsAny(content,
		'⚔ Завязалась кровавая битва',
		'⚔ The battle was all night',
		'⚔ The battle was easy and you won. However, the bandits started a fire.'
	)) {
		return {type: 'patrolreport'}
	}

	return {}
}

const CHAT_PREFIX = '#message /chat\n📣 '
export function getChat(content: string): GamescreenContent {
	if (contentFilter.starts(content, CHAT_PREFIX)) {
		const messageStartIndex = content.indexOf(': ')
		const sender = content.slice(CHAT_PREFIX.length, messageStartIndex)
		const text = content.slice(messageStartIndex + 2)

		return {chat: {
			sender, text
		}}
	}

	return {}
}

export function dig(content: string): GamescreenContent {
	if (contentFilter.includes(content, '/dig')) {
		return {type: 'dig'}
	}

	return {}
}

export function siegeStarted(content: string): GamescreenContent {
	if (contentFilter.endsAny(content, 'Siege has started!', 'Осада началась!')) {
		return {type: 'siegeStarted'}
	}

	return {}
}
