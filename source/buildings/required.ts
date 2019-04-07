import {
	calcGoldCapacity,
	calcStorageCapacity
} from '../resources'

import {
	BUILDING_COST_FACTORS,
	Buildings,
	ConstructionName
} from './building-types'

export function calcStorageLevelNeededForUpgrade(building: ConstructionName, wantedBuildingLevel: number): number {
	const maxResourceFactor = Math.max(BUILDING_COST_FACTORS[building][1], BUILDING_COST_FACTORS[building][2])
	const resourceLimitNeeded = maxResourceFactor * wantedBuildingLevel * (wantedBuildingLevel + 1)

	const tmp1 = Math.sqrt(2)
	const tmp2 = Math.sqrt(resourceLimitNeeded + 5000)
	const tmp3 = (tmp1 * tmp2) - 100
	const tmp4 = tmp3 / 10
	const levelRequired = Math.ceil(tmp4)

	return levelRequired
}

export function calcTownhallLevelNeededForUpgrade(building: ConstructionName, wantedBuildingLevel: number): number {
	const goldFactor = BUILDING_COST_FACTORS[building][0]
	const resourceLimitNeeded = goldFactor * wantedBuildingLevel * (wantedBuildingLevel + 1)

	const tmp1 = resourceLimitNeeded / 500000
	const levelRequired = Math.ceil(tmp1)
	return levelRequired
}

export function calcMaxBuildingLevel(building: ConstructionName, buildings: Buildings): number {
	const maxLevelStorage = calcMaxBuildingLevelWithStorage(building, buildings.storage)
	const maxLevelTownhall = calcMaxBuildingLevelWithTownhall(building, buildings.townhall)
	return Math.min(maxLevelStorage, maxLevelTownhall)
}

export function calcMaxBuildingLevelWithStorage(building: ConstructionName, storage: number): number {
	const maxResourceFactor = Math.max(BUILDING_COST_FACTORS[building][1], BUILDING_COST_FACTORS[building][2])
	const storageCapacity = calcStorageCapacity(storage)
	return calcMaxBuildingLevelWithFactorAndCapacity(maxResourceFactor, storageCapacity)
}

export function calcMaxBuildingLevelWithTownhall(building: ConstructionName, townhall: number): number {
	const goldFactor = BUILDING_COST_FACTORS[building][0]
	const goldCapacity = calcGoldCapacity(townhall)
	return calcMaxBuildingLevelWithFactorAndCapacity(goldFactor, goldCapacity)
}

function calcMaxBuildingLevelWithFactorAndCapacity(factor: number, capacity: number): number {
	const tmp11 = factor ** 2
	const tmp12 = -4 * factor * capacity
	const tmp1 = Math.sqrt(tmp11 - tmp12)
	const tmp2 = 2 * factor
	const tmp = (tmp1 / tmp2) - 0.5
	const result = Math.floor(tmp)
	return result
}

export function calcTownhallLevelNeededForGold(gold: number): {level: number; exact: boolean} {
	const level = Math.ceil(gold / 500000)
	const exact = gold % 500000 === 0

	return {level, exact}
}
