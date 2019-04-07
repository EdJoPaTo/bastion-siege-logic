import test, {ExecutionContext} from 'ava'

import {calcBuildingCost} from '../source/buildings/cost'

import {
	calcBuildingCostPerWinchance,
	nextBattleTimestamp
} from '../source/battle'

test('building cost per winning chance trebuchet', t => {
	const goldRequired = calcBuildingCost('trebuchet', 1).gold + calcBuildingCost('trebuchet', 2).gold
	t.deepEqual(calcBuildingCostPerWinchance('solo', 'trebuchet', 1).gold, goldRequired)
})

test('building cost per winning chance barracks solo', t => {
	const goldRequired = calcBuildingCost('barracks', 1).gold +
		calcBuildingCost('barracks', 2).gold +
		(calcBuildingCost('barracks', 3).gold * 0.5)
	t.deepEqual(calcBuildingCostPerWinchance('solo', 'barracks', 1).gold, goldRequired)
})

test('building cost per winning chance barracks alliance', t => {
	let goldRequired = 0
	for (let i = 0; i < 25; i++) {
		goldRequired += calcBuildingCost('barracks', i + 1).gold
	}

	t.deepEqual(calcBuildingCostPerWinchance('alliance', 'barracks', 1).gold, goldRequired)
})

function nextBattleTimestampMacro(t: ExecutionContext, actual: number, expected: number): void {
	t.is(actual, expected)
}

test('nextBattleTimestamp solo attack 10 min later', nextBattleTimestampMacro, nextBattleTimestamp(0).solo, 60 * 10)
test('nextBattleTimestamp solo attack 10 min after alliance attack', nextBattleTimestampMacro, nextBattleTimestamp(0, 60 * 60).solo, 60 * 70)
test('nextBattleTimestamp solo attack 10 min later ignoring nextAllianceAttack', nextBattleTimestampMacro, nextBattleTimestamp(60 * 70, 60 * 60).solo, 60 * 80)
test('nextBattleTimestamp alliance attack 60 min later', nextBattleTimestampMacro, nextBattleTimestamp(0, 0).alliance, 60 * 60)
test('nextBattleTimestamp alliance attack awaits solo attack', nextBattleTimestampMacro, nextBattleTimestamp(60 * 55, 0).alliance, 60 * 65)
test('nextBattleTimestamp pure alliance attack does not bother with last solo attack', nextBattleTimestampMacro, nextBattleTimestamp(60 * 55, 0).alliancePure, 60 * 60)
test('nextBattleTimestamp solo attack 5 min with negative karma', nextBattleTimestampMacro, nextBattleTimestamp(0, 0, -5).solo, 60 * 5)
test('nextBattleTimestamp solo attack 5 min after alliance attack with negative karma', nextBattleTimestampMacro, nextBattleTimestamp(0, 60 * 60, -5).solo, 60 * 65)
test('nextBattleTimestamp no solo attack but alliance attack solo', nextBattleTimestampMacro, nextBattleTimestamp(undefined, 0).solo, 60 * 10)
test('nextBattleTimestamp no solo attack but alliance attack alliance', nextBattleTimestampMacro, nextBattleTimestamp(undefined, 0).alliance, 60 * 60)
