import {BattlereportRaw} from '../battlereport'

import {EMOJI} from './emoji'
import {GamescreenContent} from './gamescreen-type'
import {isMystic} from './mystics'

import * as contentFilter from './helpers/content-filter'
import * as regexHelper from './helpers/regex'

interface BasicRaw {
	gold: number;
	gems?: number;
	terra: number;
	karma?: number;
}

interface WinnersLosers {
	winners?: string[];
	losers?: string[];
}

interface Soldiers {
	soldiersAlive: number;
	soldiersTotal: number;
}

interface Raw extends BasicRaw, WinnersLosers, Soldiers {
	won: boolean;
	me: string;
	enemy: string;
	enemyAlliance?: string;
}

interface SoldiersRegExp {
	normal: string;
	noneOf: string;
	noneOf2: string;
	withoutLoss: string;
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
		gold: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.gold}`) || 0,
		gems: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.gem}`),
		terra: regexHelper.getOptionalNumber(content, `(\\d+)${EMOJI.terra}`) || 0,
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

	const winnersLosers = getWinnersLosersFromAllianceAttack(content, /Победители: (.+)/, /Проигравшие: (.+)/)

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

	const winnersLosers = getWinnersLosersFromAllianceAttack(content, /Winners: (.+)/, /Losers: (.+)/)

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

function getWinnersLosersFromAllianceAttack(content: string, winnersRegex: RegExp, losersRegex: RegExp): WinnersLosers {
	const winners = regexHelper.getOptional(content, winnersRegex)
	const losers = regexHelper.getOptional(content, losersRegex)

	if (!winners || !losers) {
		return {}
	}

	return {
		winners: winners.split(', '),
		losers: losers.split(', ')
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

	const battlereport: BattlereportRaw = {
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
		battlereport.karma = raw.karma || 0
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

interface FriendsEnemies {
	friends: string[];
	enemies: string[];
}

function getFriendsEnemies(raw: Raw): FriendsEnemies {
	if (raw.won) {
		return {
			enemies: raw.losers || [raw.enemy],
			friends: raw.winners || [raw.me]
		}
	}

	return {
		enemies: raw.winners || [raw.enemy],
		friends: raw.losers || [raw.me]
	}
}
