type Dict<T> = {[key: string]: T}

interface LangDict {
	en: string;
	ru: string;
}

export const GAMETEXT_CONSTRUCTIONS: Dict<LangDict> = {
	townhall: {
		en: 'Town hall',
		ru: 'Ратуша'
	},
	storage: {
		en: 'Storage',
		ru: 'Склад'
	},
	houses: {
		en: 'Houses',
		ru: 'Дома'
	},
	farm: {
		en: 'Farm',
		ru: 'Ферма'
	},
	sawmill: {
		en: 'Sawmill',
		ru: 'Лесопилка'
	},
	mine: {
		en: 'Mine',
		ru: 'Шахта'
	},
	barracks: {
		en: 'Barracks',
		ru: 'Казармы'
	},
	wall: {
		en: 'Walls',
		ru: 'Стена'
	},
	trebuchet: {
		en: 'Trebuchet',
		ru: 'Требушет'
	},
	ballista: {
		en: 'Ballista',
		ru: 'Баллиста'
	}
}
