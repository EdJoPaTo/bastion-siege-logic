import {
	ConstructionResources,
	calcMinutesNeeded
} from '../resources'

import {
	BUILDING_COST_FACTORS,
	ConstructionName,
	Buildings
} from './building-types'

export function calcBuildingCost(building: ConstructionName, currentBuildingLevel: number): ConstructionResources {
	return {
		gold: BUILDING_COST_FACTORS[building][0] * (currentBuildingLevel + 1) * (currentBuildingLevel + 2),
		wood: BUILDING_COST_FACTORS[building][1] * (currentBuildingLevel + 1) * (currentBuildingLevel + 2),
		stone: BUILDING_COST_FACTORS[building][2] * (currentBuildingLevel + 1) * (currentBuildingLevel + 2)
	}
}

export function calcBuildingCostUntil(building: ConstructionName, currentBuildingLevel: number, targetLevel: number): ConstructionResources {
	const sum = {gold: 0, wood: 0, stone: 0}
	for (let i = currentBuildingLevel; i < targetLevel; i++) {
		const cost = calcBuildingCost(building, i)
		sum.gold += cost.gold
		sum.wood += cost.wood
		sum.stone += cost.stone
	}

	return sum
}

export function calcWallRepairCost(wallLevel: number): ConstructionResources {
	const wallUpgradeCost = calcBuildingCost('wall', wallLevel)
	return {
		gold: wallUpgradeCost.gold / 10,
		wood: wallUpgradeCost.wood / 10,
		stone: wallUpgradeCost.stone / 10
	}
}

export function calcMinutesNeededForUpgrade(building: ConstructionName, currentBuildingLevel: number, buildings: Buildings, currentResources: ConstructionResources): number {
	const cost = calcBuildingCost(building, currentBuildingLevel)
	return calcMinutesNeeded(cost, buildings, currentResources)
}
