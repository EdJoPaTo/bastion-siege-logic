import {Castle} from '../castle'

import {GAMETEXT} from './gametext'

export function castleGametext(castle: Castle, language: 'en' | 'ru'): string {
	if (castle === 'diamond') {
		return GAMETEXT.castleDiamond[language]
	}

	if (castle === 'ruby') {
		return GAMETEXT.castleRuby[language]
	}

	return GAMETEXT.castleSapphire[language]
}

export function determineCastle(content: string): {castle: Castle; lang: 'en' | 'ru'} | undefined {
	if (content.includes(GAMETEXT.castleDiamond.en)) {
		return {castle: 'diamond', lang: 'en'}
	}

	if (content.includes(GAMETEXT.castleRuby.en)) {
		return {castle: 'ruby', lang: 'en'}
	}

	if (content.includes(GAMETEXT.castleSapphire.en)) {
		return {castle: 'sapphire', lang: 'en'}
	}

	if (content.includes(GAMETEXT.castleDiamond.ru)) {
		return {castle: 'diamond', lang: 'ru'}
	}

	if (content.includes(GAMETEXT.castleRuby.ru)) {
		return {castle: 'ruby', lang: 'ru'}
	}

	if (content.includes(GAMETEXT.castleSapphire.ru)) {
		return {castle: 'sapphire', lang: 'ru'}
	}

	return undefined
}
