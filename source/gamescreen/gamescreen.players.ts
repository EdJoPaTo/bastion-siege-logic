import {Gamescreen} from './gamescreen-type'
import {parsePlayer} from './player'
import {EMOJI} from './emoji'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

export function allianceBattleStart(content: string): Gamescreen {
	if (contentFilter.includesAll(content, 'Your ally ', ' attacked ', ' help ')) {
		const defenceMatch = /Your ally (.+) was attacked by (.+) from /.exec(content)
		const attackMatch = /Your ally (.+) attacked (.+) from /.exec(content)

		const allyMatch = defenceMatch ? defenceMatch : attackMatch
		const enemyMatch = defenceMatch ? defenceMatch : attackMatch

		if (!allyMatch || !enemyMatch) {
			throw new Error('could not read allianceBattleStart')
		}

		const ally = parsePlayer(allyMatch[1])
		const enemy = parsePlayer(enemyMatch[2])
		return {allianceBattleStart: {
			attack: !defenceMatch,
			ally,
			enemy
		}}
	}

	if (contentFilter.includesAll(content, ' союзник', ' атаковал ', ' Ты можешь ')) {
		const regex = /союзник.? (.+) атаковал (.+) из /
		const attack = /атаке/.test(content)
		const ally = regexHelper.getPlayer(content, regex, 1)
		const enemy = regexHelper.getPlayer(content, regex, 2)

		return {allianceBattleStart: {
			attack,
			ally,
			enemy
		}}
	}

	return {}
}

const allianceBattleSupportAttack = EMOJI.alliancebattle + EMOJI.attack
const allianceBattleSupportDefence = EMOJI.alliancebattle + EMOJI.defence

export function allianceBattleSupport(content: string): Gamescreen {
	if (contentFilter.startsAny(content, allianceBattleSupportAttack, allianceBattleSupportDefence)) {
		const trimmedText = content.startsWith(allianceBattleSupportAttack) ?
			content.slice(allianceBattleSupportAttack.length) :
			content.slice(allianceBattleSupportDefence.length)

		if (contentFilter.ends(trimmedText, 'Твоя армия присоединилась к атаке.')) {
			// Your army joined the attack
			return {}
		}

		const playerPartRegex = contentFilter.includes(trimmedText, '\'s army joined the ') ?
			/(.+)'s army joined the / :
			/Армия (.+) присоединилась к /
		const player = regexHelper.getPlayer(trimmedText, playerPartRegex)

		return {allianceBattleSupport: player}
	}

	return {}
}

export function allianceJoinRequest(content: string): Gamescreen {
	if (contentFilter.ends(content, 'wants to enter your alliance.')) {
		return {allianceJoinRequest: regexHelper.getPlayer(content, /^([\s\S]+) from /)}
	}

	if (contentFilter.starts(content, 'В твой альянс желает вступить')) {
		return {allianceJoinRequest: regexHelper.getPlayer(content, /желает вступить ([\s\S]+) из/)}
	}

	return {}
}

export function attackIncoming(content: string): Gamescreen {
	if (contentFilter.ends(content, 'Army will be sent to the defense!')) {
		return {attackIncoming: regexHelper.getPlayer(content, /attacked! ([\s\S]+) approaches/)}
	}

	if (contentFilter.includes(content, 'Твои владения атакованы')) {
		return {attackIncoming: regexHelper.getPlayer(content, /атакованы! ([\s\S]+) подступает/)}
	}

	return {}
}

export function attackscout(content: string): Gamescreen {
	const isEnglish = contentFilter.starts(content, 'Our scouts found ')
	const isRussian = contentFilter.starts(content, 'Разведчики докладывают')

	if (isEnglish || isRussian) {
		const karma = regexHelper.getNumberStrict(content, `(\\d+)${EMOJI.karma}`)
		const terra = regexHelper.getNumberStrict(content, `(\\d+)${EMOJI.terra}`)

		if (isEnglish) {
			return {attackscout: {
				player: regexHelper.getPlayer(content, /Our scouts found ([\s\S]+) in his domain/),
				karma, terra
			}}
		}

		if (isRussian) {
			return {attackscout: {
				player: regexHelper.getPlayer(content, /расположился ([\s\S]+) в своих владениях/),
				karma, terra
			}}
		}

		throw new Error('you found a new language?')
	}

	return {}
}
