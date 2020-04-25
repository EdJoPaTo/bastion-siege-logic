import {
	ConstructionResources
} from './resources'

import {
	calcBuildingCost,
	calcBuildingCostUntil
} from './buildings/cost'

export type BattleType = keyof BattleOdds
export type BattleBuilding = keyof BattleBuildingOdds

interface BattleOdds {
	readonly solo: BattleBuildingOdds;
	readonly alliance: BattleBuildingOdds;
}

interface BattleBuildingOdds {
	readonly barracks: number;
	readonly trebuchet: number;
	readonly wall: number;
}

export const BATTLE_ODDS: BattleOdds = {
	solo: {
		// 100 gives +1, each level grants 40
		barracks: 40 / 100,
		// +1 each two levels
		trebuchet: 0.5,
		// +1 one each two levels + 10 army -> 0.1 per level
		wall: 0.5 + 0.1
	},
	alliance: {
		// 1000 gives +1
		barracks: 40 / 1000,
		trebuchet: 0.5,
		wall: 0.5 + 0.01
	}
}

export function calcBuildingCostPerWinchance(battleType: BattleType, building: BattleBuilding, currentBuildingLevel: number): ConstructionResources {
	const buildingLevelsRequired = 1 / BATTLE_ODDS[battleType][building]
	const completeLevelsRequired = Math.floor(buildingLevelsRequired)
	const partialRequirementPercent = buildingLevelsRequired - completeLevelsRequired

	const buildingCostComplete = calcBuildingCostUntil(building, currentBuildingLevel, currentBuildingLevel + completeLevelsRequired)
	const buildingCostTopoff = calcBuildingCost(building, currentBuildingLevel + completeLevelsRequired)

	const resultCost = {
		gold: buildingCostComplete.gold + (buildingCostTopoff.gold * partialRequirementPercent),
		wood: buildingCostComplete.wood + (buildingCostTopoff.wood * partialRequirementPercent),
		stone: buildingCostComplete.stone + (buildingCostTopoff.stone * partialRequirementPercent)
	}

	return resultCost
}

export function nextBattleTimestamp(battleSoloTimestamp = 0, battleAllianceTimestamp = 0, karma = 0): {alliance: number; alliancePure: number; solo: number} {
	const lastAttackTimestamp = Math.max(battleSoloTimestamp, battleAllianceTimestamp)
	const minutesTillNextSoloAttack = karma < 0 ? 5 : 10

	const nextAttack = lastAttackTimestamp + (60 * minutesTillNextSoloAttack)
	const nextAllianceAttackAvailable = battleAllianceTimestamp + (60 * 60)

	return {
		alliance: Math.max(nextAttack, nextAllianceAttackAvailable),
		alliancePure: nextAllianceAttackAvailable,
		solo: nextAttack
	}
}
