import {EMOJI} from './emoji'
import {GamescreenContent} from './gamescreen-type'
import {MYSTICS_TEXT_EN, MYSTICS_TEXT_RU} from './mystics'
import {parsePlayer} from './player'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

export function allianceBattleStart(content: string): GamescreenContent {
	if (contentFilter.includesAll(content, 'Your ally ', ' attacked ')) {
		const indexOf = content.indexOf(' from ')
		const shortenedContent = indexOf < 0 ? content : content.slice(0, indexOf)

		const defenceMatch = /Your ally (.+) was attacked by (.+)/.exec(shortenedContent)
		const attackMatch = /Your ally (.+) attacked (.+)/.exec(shortenedContent)

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

	if (contentFilter.includesAll(content, ' союзник', ' атаковал ')) {
		const indexOf = content.indexOf(' из ')
		const shortenedContent = indexOf < 0 ? content : content.slice(0, indexOf)

		const regex = /союзник.? (.+) атаковал (.+)$/
		const attack = content.includes('Твой')
		const ally = regexHelper.getPlayer(shortenedContent, regex, 1)
		const enemy = regexHelper.getPlayer(shortenedContent, regex, 2)

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

export function allianceBattleSupport(content: string): GamescreenContent {
	if (contentFilter.startsAny(content, allianceBattleSupportAttack, allianceBattleSupportDefence)) {
		const trimmedText = content.startsWith(allianceBattleSupportAttack) ?
			content.slice(allianceBattleSupportAttack.length) :
			content.slice(allianceBattleSupportDefence.length)

		if (contentFilter.endsAny(trimmedText, 'Your army joined the attack.', 'Твоя армия присоединилась к атаке.')) {
			return {
				type: 'allianceBattleYourArmyJoined'
			}
		}

		const playerPartRegex = contentFilter.includes(trimmedText, '\'s army joined the ') ?
			/(.+)'s army joined the / :
			/Армия (.+) присоединилась к /
		const player = regexHelper.getPlayer(trimmedText, playerPartRegex)

		return {allianceBattleSupport: player}
	}

	return {}
}

export function allianceJoinRequest(content: string): GamescreenContent {
	if (contentFilter.ends(content, 'wants to enter your alliance.')) {
		return {allianceJoinRequest: regexHelper.getPlayer(content, /^([\s\S]+) from /)}
	}

	if (contentFilter.starts(content, 'В твой альянс желает вступить')) {
		return {allianceJoinRequest: regexHelper.getPlayer(content, /желает вступить ([\s\S]+) из/)}
	}

	return {}
}

export function attackIncoming(content: string): GamescreenContent {
	if (contentFilter.includes(content, 'Your domain attacked! ')) {
		if (contentFilter.includes(content, MYSTICS_TEXT_EN.dragon)) {
			return {attackIncoming: {
				mystic: 'dragon',
				name: MYSTICS_TEXT_EN.dragon
			}}
		}

		if (contentFilter.includes(content, '☠️Undead army')) {
			return {attackIncoming: {
				mystic: 'undead',
				name: MYSTICS_TEXT_EN.undead
			}}
		}

		return {attackIncoming: regexHelper.getPlayer(content, /attacked! ([\s\S]+) approaches/)}
	}

	if (contentFilter.includes(content, 'Твои владения атакованы')) {
		if (contentFilter.includes(content, '🐲Дракон')) {
			return {attackIncoming: {
				mystic: 'dragon',
				name: MYSTICS_TEXT_RU.dragon
			}}
		}

		if (contentFilter.includes(content, 'Армия ☠️Нежити')) {
			return {attackIncoming: {
				mystic: 'undead',
				name: MYSTICS_TEXT_RU.undead
			}}
		}

		return {attackIncoming: regexHelper.getPlayer(content, /атакованы! ([\s\S]+) подступает/)}
	}

	return {}
}

export function attackscout(content: string): GamescreenContent {
	const isEnglish = contentFilter.starts(content, 'Our scouts found ')
	const isRussian = contentFilter.starts(content, 'Разведчики докладывают')

	if (isEnglish || isRussian) {
		const karma = regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.karma}`) ?? 0
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

export function serverStatistics(content: string): GamescreenContent {
	if (!contentFilter.starts(content, EMOJI.serverStatistics)) {
		return {}
	}

	const conqueror = regexHelper.getPlayer(content, /\S+: (.+)/)
	return {conqueror}
}

export function personalAllianceOverview(content: string): GamescreenContent {
	const isEnglish = contentFilter.starts(content, 'Welcome to the alliance ')
	const isRussian = contentFilter.starts(content, 'Добро пожаловать в альянс ')
	if (!isEnglish && !isRussian) {
		return {}
	}

	const allianceLeader = regexHelper.getPlayer(content, isEnglish ? /Alliance leader: (.+)/ : /Лидер альянса: (.+)/)
	return {
		type: 'personalAllianceOverview',
		allianceLeader
	}
}

export function alreadyInFight(content: string): GamescreenContent {
	if (contentFilter.ends(content, ' is already in a fight with someone. You can not interfere.')) {
		return {
			alreadyInFight: regexHelper.getPlayer(content, /(.+) is already in a fight/)
		}
	}

	if (contentFilter.ends(content, ' уже ведет бой с кем-то. Законы чести этих земель не позволяют нам вмешаться.')) {
		return {
			alreadyInFight: regexHelper.getPlayer(content, /(.+) уже ведет бой/)
		}
	}

	return {}
}

export function netRecoveredFromFight(content: string): GamescreenContent {
	if (contentFilter.ends(content, ' has not yet recovered from the last battle. You can not attack him.')) {
		return {
			notRecoveredFromFight: regexHelper.getPlayer(content, /(.+) has not yet/)
		}
	}

	if (contentFilter.ends(content, ' еще не оправился от предыдущей битвы. Напасть на него сейчас будет совсем не по чести.')) {
		return {
			notRecoveredFromFight: regexHelper.getPlayer(content, /(.+) еще не оправился/)
		}
	}

	return {}
}
