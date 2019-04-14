import {GamescreenContent, CastleSiegeParticipant} from './gamescreen-type'
import {parsePlayer} from './player'
import {EMOJI} from './emoji'
import {inputTextCleanup} from './text-cleanup'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

const JOIN_BEGIN_EMOJIS = EMOJI.attack + EMOJI.castle + ' '

export function joined(input: string): GamescreenContent {
	const content = inputTextCleanup(input)
	if (contentFilter.startsAny(content,
		JOIN_BEGIN_EMOJIS + 'Твоя армия присоединилась к осаде на',
		JOIN_BEGIN_EMOJIS + 'Your army joined the siege on',
		JOIN_BEGIN_EMOJIS + 'Your alliance successfully joined the siege of the castle. Your whole army is sent to its walls. All members of your alliance are notified of the siege.',
		JOIN_BEGIN_EMOJIS + 'Твой альянс успешно присоединился к осаде замка. Вся твоя армия отправлена к его стенам. Всем участникам твоего альянса отправлены уведомления о вступлении в осаду.'
	)) {
		return {type: 'castleSiegeYouJoined'}
	}

	const isEnglish = contentFilter.includes(content, ' joined the siege ')
	const isRussian = contentFilter.includesAny(content, ' присоединился к осаде на ', ' выступил против осады на ')
	if (!(isEnglish || isRussian)) {
		return {}
	}

	if (contentFilter.starts(content, 'The alliance ')) {
		const {alliance} = regexHelper.getPlayer(content, /The alliance (.+) joined the siege /)
		if (!alliance) {
			throw new Error('failed to parse castle join')
		}

		return {castleSiegeAllianceJoined: {alliance}}
	}

	if (contentFilter.starts(content, 'Альянс ')) {
		const {alliance} = regexHelper.getPlayer(content, /Альянс (.+) присоединился к осаде на /)
		if (!alliance) {
			throw new Error('failed to parse castle join')
		}

		return {castleSiegeAllianceJoined: {alliance}}
	}

	if (!contentFilter.starts(content, JOIN_BEGIN_EMOJIS)) {
		throw new Error('failed to parse castle join')
	}

	const emojis = EMOJI.army + '.?' + EMOJI.castle

	if (isEnglish) {
		const regex = `${emojis}(?: The leader of your alliance)? (.+) joined the siege `
		return {castleSiegePlayerJoined: regexHelper.getPlayer(content, regex)}
	}

	if (isRussian) {
		const regex = `${emojis}(?: Лидер твоего альянса)? (.+) (?:(?:присоединился)|(?:выступил)) `
		return {castleSiegePlayerJoined: regexHelper.getPlayer(content, regex)}
	}

	throw new Error('you found a new language?')
}

export function participants(content: string): GamescreenContent {
	if (!contentFilter.includesAny(content, 'окончено. Осада вот-вот начнется. В ней примут участие', 'complete. The siege is about to begin. In it will take part')) {
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

	return {castleSiegeParticipants: alliances}
}

export function nextCastleSiege(content: string): GamescreenContent {
	if (contentFilter.startsWithGametext(content, 'castle', 'nextCastleSiege', true)) {
		return {type: 'nextCastleSiege'}
	}

	return {}
}
