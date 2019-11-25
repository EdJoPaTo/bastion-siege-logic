import {Castle} from '../castle'

import {GAMETEXT} from './gametext'

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
