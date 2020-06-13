import {BattlereportRaw} from '../battlereport'

import {EMOJI} from './emoji'
import {GamescreenContent} from './gamescreen-type'
import {isMystic} from './mystics'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

type Mutable<T> = {-readonly[P in keyof T]: T[P]}

interface BasicRaw {
	readonly gold: number;
	readonly gems?: number;
	readonly terra: number;
	readonly karma?: number;
}

interface WinnersLosers {
	readonly winners?: readonly string[];
	readonly losers?: readonly string[];
}

interface FriendsEnemies {
	readonly me: string;
	readonly friends: readonly string[];
	readonly enemies: readonly string[];
}

interface Soldiers {
	readonly soldiersAlive: number;
	readonly soldiersTotal: number;
}

interface Raw extends BasicRaw, WinnersLosers, Soldiers {
	readonly won: boolean;
	readonly me: string;
	readonly enemy: string;
	readonly enemyAlliance?: string;
}

interface SoldiersRegExp {
	readonly normal: string;
	readonly noneOf: string;
	readonly noneOf2: string;
	readonly withoutLoss: string;
}

const REGEX_ARMY = `${EMOJI.army}.?`

export function battlereport(content: string): GamescreenContent {
	const isEnglish = contentFilter.starts(content, '‼️The battle with ')
	const isRussian = contentFilter.starts(content, '‼️Битва с ')

	if (!(isEnglish || isRussian)) {
		return {}
	}

	const raw = isEnglish ? rawContentFromEnglish(content) : rawContentFromRussian(content)
	const battlereport = getBattlereportFromRaw(raw)

	return {battlereport}
}

function getBattlereportBasicRaw(content: string): BasicRaw {
	const raw: BasicRaw = {
		gold: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.gold}`) ?? 0,
		gems: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.gem}`),
		terra: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.terra}`) ?? 0,
		karma: regexHelper.getOptionalNumber(content, `(-?\\d+)${EMOJI.karma}`)
	}

	return raw
}

function rawContentFromRussian(content: string): Raw {
	const basicRaw = getBattlereportBasicRaw(content)
	const won = content.includes('Поздравляю')

	const me = regexHelper.getStrict(content, won ?
		/Поздравляю, ([^!]+)! / :
		/К сожалению, ([^,]+), /
	)

	const {name: enemy, alliance: enemyAlliance} = regexHelper.getPlayer(content, /Битва с (?:альянсом )?([\s\S]+) окончена/)

	const winnersLosers = getWinnersLosersFromAllianceAttack(content, 'Победители', 'Проигравшие', ['\nДля', '\nПолучен новый эффект'])

	const soldiers = getSoldiers(content, {
		normal: `(\\d+)${REGEX_ARMY} из (\\d+)${REGEX_ARMY}`,
		noneOf: `Никто из (\\d+)${REGEX_ARMY}`,
		noneOf2: `каждый из (\\d+)${REGEX_ARMY} отдал свою жизнь`,
		withoutLoss: `(\\d+)${REGEX_ARMY} без единой потери`
	})

	return {
		...basicRaw,
		won,
		me,
		enemy,
		enemyAlliance,
		...winnersLosers,
		...soldiers
	}
}

function rawContentFromEnglish(content: string): Raw {
	const basicRaw = getBattlereportBasicRaw(content)
	const won = /Your (?:(?:army)|(?:alliance)) won/.test(content)
	const me = regexHelper.getStrict(content, won ?
		/Congratulations, ([^!]+)! Your / :
		/Unfortunately, ([^,]+), your /
	)

	const {name: enemy, alliance: enemyAlliance} = regexHelper.getPlayer(content, /battle with (?:alliance )?([\s\S]+) complete/)

	const winnersLosers = getWinnersLosersFromAllianceAttack(content, 'Winners', 'Losers', ['\nFor', '\nA new effect is obtained'])

	const soldiers = getSoldiers(content, {
		normal: `(\\d+)${REGEX_ARMY} of (\\d+)${REGEX_ARMY}`,
		noneOf: `None of the (\\d+)${REGEX_ARMY}`,
		noneOf2: `each of (\\d+)${REGEX_ARMY} gave his life`,
		withoutLoss: `(\\d+)${REGEX_ARMY} without a loss`
	})

	return {
		...basicRaw,
		won,
		me,
		enemy,
		enemyAlliance,
		...winnersLosers,
		...soldiers
	}
}

function getWinnersLosersFromAllianceAttack(content: string, winnersString: string, losersString: string, losersAbortStrings: readonly string[]): WinnersLosers {
	if (!contentFilter.includesAll(content, winnersString, losersString)) {
		return {}
	}

	const winnersStartIndex = content.indexOf(winnersString + ': ')
	const losersStartIndex = content.indexOf(losersString + ': ')
	const loserAbortIndex = Math.min(content.length, ...losersAbortStrings.map(o => content.indexOf(o)).filter(o => o > 0))

	const winnersSubstring = content.slice(winnersStartIndex + winnersString.length + 2, losersStartIndex - 1)
	const winners = winnersSubstring.split(', ')
		.map(o => o.trim())

	const losersSubstring = content.slice(losersStartIndex + losersString.length + 2, loserAbortIndex)
	const losers = losersSubstring.split(', ')
		.map(o => o.trim())

	return {
		winners,
		losers
	}
}

function getSoldiers(content: string, regexps: SoldiersRegExp): Soldiers {
	const noneOf = regexHelper.getOptionalNumber(content, regexps.noneOf)
	if (noneOf !== undefined) {
		return {
			soldiersAlive: 0,
			soldiersTotal: noneOf
		}
	}

	const noneOf2 = regexHelper.getOptionalNumber(content, regexps.noneOf2)
	if (noneOf2 !== undefined) {
		return {
			soldiersAlive: 0,
			soldiersTotal: noneOf2
		}
	}

	const withoutLoss = regexHelper.getOptionalNumber(content, regexps.withoutLoss)
	if (withoutLoss !== undefined) {
		return {
			soldiersAlive: withoutLoss,
			soldiersTotal: withoutLoss
		}
	}

	return {
		soldiersAlive: regexHelper.getNumberStrict(content, regexps.normal, 1),
		soldiersTotal: regexHelper.getNumberStrict(content, regexps.normal, 2)
	}
}

function getBattlereportFromRaw(raw: Raw): BattlereportRaw {
	// XOR: when terra & won -> attack, when no terra and lost -> attack
	const attack = raw.won ? raw.terra > 0 : raw.terra === 0

	const lossNegation = raw.won ? 1 : -1
	const gold = (raw.gold * lossNegation) || 0

	const friendsEnemies = getFriendsEnemies(raw)

	const battlereport: Mutable<BattlereportRaw> = {
		attack,
		won: raw.won,
		...friendsEnemies,
		soldiersAlive: raw.soldiersAlive,
		soldiersTotal: raw.soldiersTotal,
		gold
	}

	if (raw.gems) {
		battlereport.gems = raw.gems
	}

	if (raw.terra) {
		battlereport.terra = raw.terra * lossNegation
	}

	if (battlereport.attack && battlereport.won) {
		// Won attacks against 0 karma targets grant 0 karma
		battlereport.karma = raw.karma ?? 0
	} else if (raw.karma) {
		// While having negative karma -> losses grant karma
		battlereport.karma = raw.karma
	}

	const mystic = isMystic(raw.enemy)
	if (mystic) {
		battlereport.attack = false
		battlereport.enemyMystic = mystic
	}

	if (raw.enemyAlliance) {
		battlereport.enemyAlliance = raw.enemyAlliance
	}

	return battlereport
}

function getFriendsEnemies(raw: Raw): FriendsEnemies {
	if (raw.won) {
		return {
			enemies: raw.losers ?? [raw.enemy],
			friends: raw.winners ?? [raw.me],
			me: raw.me
		}
	}

	return {
		enemies: raw.winners ?? [raw.enemy],
		friends: raw.losers ?? [raw.me],
		me: raw.me
	}
}
