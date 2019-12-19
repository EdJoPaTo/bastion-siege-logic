import {determineCastle} from './castle'
import {EMOJI} from './emoji'
import {GamescreenContent, CastleSiegeParticipant} from './gamescreen-type'
import {inputTextCleanup} from './text-cleanup'
import {parsePlayer} from './player'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

const JOIN_BEGIN_EMOJIS = EMOJI.attack + EMOJI.castle + ' '

export function siegeAvailable(input: string): GamescreenContent {
	const content = inputTextCleanup(input)
	if (!contentFilter.startsAny(content,
		JOIN_BEGIN_EMOJIS + 'The siege is available on ',
		JOIN_BEGIN_EMOJIS + 'Preparation begins for the siege on ',
		JOIN_BEGIN_EMOJIS + 'Доступна осада на ',
		JOIN_BEGIN_EMOJIS + 'Начинается подготовка к осаде на '
	)) {
		return {}
	}

	const info = determineCastle(content)
	if (!info) {
		throw new Error('failed to parse siege available')
	}

	return {
		castle: info.castle,
		type: 'castleSiegeAvailable'
	}
}

export function siegeStarts(input: string): GamescreenContent {
	const content = inputTextCleanup(input)
	if (!contentFilter.startsAny(content,
		JOIN_BEGIN_EMOJIS + 'Siege on ',
		JOIN_BEGIN_EMOJIS + 'Осада на '
	) || !contentFilter.endsAny(content,
		' castle began!',
		' замок началась!'
	)) {
		return {}
	}

	const info = determineCastle(content)
	if (!info) {
		throw new Error('failed to parse siege available')
	}

	return {
		castle: info.castle,
		type: 'castleSiegeStarts'
	}
}

export function siegeEnds(input: string): GamescreenContent {
	const content = inputTextCleanup(input)
	if (!contentFilter.startsAny(content,
		JOIN_BEGIN_EMOJIS + 'Siege on ',
		JOIN_BEGIN_EMOJIS + 'Осада на '
	) || !contentFilter.includesAny(content,
		' castle is over!',
		' замок окончена!'
	)) {
		return {}
	}

	const info = determineCastle(content)
	if (!info) {
		throw new Error('failed to parse castle siege end')
	}

	if (contentFilter.includes(content, 'remains')) {
		const {alliance} = regexHelper.getPlayer(content, /remains for (.+)./)
		if (!alliance) {
			throw new Error('failed to parse castle siege end')
		}

		return {
			castle: info.castle,
			castleSiegeEnds: {
				oldAlliance: alliance,
				newAlliance: alliance
			}
		}
	}

	if (contentFilter.includesAny(content,
		'your alliance took ',
		'твой альянс занял ',
		'repulsed'
	)) {
		return {
			castle: info.castle,
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: undefined
			}
		}
	}

	let oldAlliance: string | undefined
	if (contentFilter.includesAny(content, ' loses castle.', ' теряет замок.') &&
		!contentFilter.includes(content, ' альянс не смог выдержать осаду ')
	) {
		const {alliance} = regexHelper.getPlayer(content, info.lang === 'en' ?
			/\. ([^.]+) loses castle\./ :
			/\. ([^.]+) теряет замок\./)
		if (!alliance) {
			throw new Error('failed to parse castle siege end')
		}

		oldAlliance = alliance
	}

	const {alliance: newAlliance} = regexHelper.getPlayer(content, info.lang === 'en' ?
		/ castle passes to ([^.]+)\./ :
		/ замок переходит(?: к)? ([^.]+)\./)
	if (!newAlliance) {
		throw new Error('failed to parse castle siege end')
	}

	return {
		castle: info.castle,
		castleSiegeEnds: {
			oldAlliance,
			newAlliance
		}
	}
}

export function joined(input: string): GamescreenContent {
	const content = inputTextCleanup(input)
	const info = determineCastle(content)

	if (contentFilter.startsAny(content,
		JOIN_BEGIN_EMOJIS + 'Твоя армия присоединилась к осаде на',
		JOIN_BEGIN_EMOJIS + 'Твоя армия отправилась противостоять осаде на',
		JOIN_BEGIN_EMOJIS + 'Your army joined the siege on',
		JOIN_BEGIN_EMOJIS + 'Your army went to resist the siege on ',
		JOIN_BEGIN_EMOJIS + 'Your alliance successfully joined the siege ',
		JOIN_BEGIN_EMOJIS + 'Твой альянс успешно присоединился к осаде замка. Вся твоя армия отправлена к его стенам. Всем участникам твоего альянса отправлены уведомления о вступлении в осаду.',
		JOIN_BEGIN_EMOJIS + 'Твой альянс успешно присоединился к осаде на Сапфировый замок. Вся твоя армия отправлена к его стенам. Всем участникам твоего альянса отправлены уведомления о вступлении в осаду.'
	)) {
		return {
			type: 'castleSiegeYouJoined',
			castle: info?.castle
		}
	}

	if (!contentFilter.includesAny(content,
		' joined the siege ',
		' go against the siege ',
		' присоединился к осаде на ',
		' выступил против осады на '
	)) {
		return {}
	}

	if (!info) {
		throw new Error('failed to parse castle join')
	}

	if (contentFilter.startsAny(content, 'The alliance ', 'Альянс ')) {
		const {alliance} = regexHelper.getPlayer(content, info.lang === 'en' ?
			/The alliance (.+) joined the siege / :
			/Альянс (.+) присоединился к осаде на /)
		if (!alliance) {
			throw new Error('failed to parse castle join')
		}

		return {
			castle: info.castle,
			castleSiegeAllianceJoined: {alliance}
		}
	}

	if (!contentFilter.starts(content, JOIN_BEGIN_EMOJIS)) {
		throw new Error('failed to parse castle join')
	}

	const emojis = EMOJI.army + '.?' + EMOJI.castle

	const regex = info.lang === 'en' ?
		`${emojis}(?: The leader of your alliance)? (.+) (?:(?:joined)|(?:go against)) the siege ` :
		`${emojis}(?: Лидер твоего альянса)? (.+) (?:(?:присоединился)|(?:выступил)) `

	return {
		castle: info.castle,
		castleSiegePlayerJoined: regexHelper.getPlayer(content, regex)
	}
}

export function participants(content: string): GamescreenContent {
	if (!contentFilter.includesAny(content, 'окончено. Осада вот-вот начнется. В ней примут участие', 'complete. The siege is about to begin. In it will take part')) {
		return {}
	}

	const info = determineCastle(content)
	if (!info) {
		return {}
	}

	const lines = content
		.split('\n')
		.map(o => o.trim())

	const alliances: CastleSiegeParticipant[] = []
	for (const line of lines) {
		if (line.startsWith('[')) {
			const {alliance, name} = regexHelper.getPlayer(line, /^(\[[^\]]+\][^(]+)(?: \(\d+\))?$/)
			if (!alliance) {
				throw new Error('failed to parse castle participants')
			}

			alliances.push({
				alliance,
				name,
				players: []
			})
		} else if (line.startsWith('-')) {
			const {name} = parsePlayer(line.slice(2))
			alliances[alliances.length - 1].players.push(name)
		}
	}

	return {
		castle: info.castle,
		castleSiegeParticipants: alliances
	}
}

export function nextCastleSiege(content: string): GamescreenContent {
	if (contentFilter.startsWithGametext(content, 'castle', 'nextCastleSiege', true)) {
		return {type: 'nextCastleSiege'}
	}

	return {}
}
