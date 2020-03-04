import {
	Buildings
} from './buildings'

export interface ConstructionResources {
	gold: number;
	wood: number;
	stone: number;
}

export interface Resources {
	gold: number;
	wood: number;
	stone: number;
	food: number;
}

export type ConstructionResourceName = keyof ConstructionResources
export type ResourceName = keyof Resources

export const CONSTRUCTION_RESOURCES: ConstructionResourceName[] = ['gold', 'wood', 'stone']
export const RESOURCES: ResourceName[] = ['gold', 'wood', 'stone', 'food']

export function calcGoldCapacity(townhallLevel: number): number {
	return 500000 * townhallLevel
}

export function calcStorageCapacity(storageLevel: number): number {
	return 50 * storageLevel * (storageLevel + 20)
}

export function calcGoldIncomePerPerson(townhallLevel: number): number {
	return 0.5 + (0.1 * townhallLevel)
}

export function calcGoldIncome(townhallLevel: number, housesLevel: number): number {
	// 0.1 * 20 = 1 * 2
	// return (0.5 + 0.1 * townhallLevel) * housesLevel * 20
	// return calcGoldIncomePerPerson(townhallLevel) * calcHousesCapacity(housesLevel)
	return (5 + townhallLevel) * housesLevel * 2
}

export function calcProduction(productionBuildingLevel: number): number {
	return 10 * productionBuildingLevel
}

export function calcProductionFood(farmLevel: number, housesLevel: number): number {
	// Exact would be the following but it can be more calculated more efficiently
	// return calcProduction(farmLevel) - housesLevel * 20 / 2
	return (farmLevel - housesLevel) * 10
}

// Semitotal Gold is the amount of gold needed in order to buy everything.
// Gold is much fast to get and buy the resources with it than the buildings gather them
// so this will be kinda wrong on low levels were you could sell resources in order to get gold
export function calcSemitotalGold({gold, wood, stone}: ConstructionResources): number {
	return gold + (wood * 2) + (stone * 2)
}

export function calcSemitotalGoldIncome(buildings: Buildings): number {
	return calcGoldIncome(buildings.townhall, buildings.houses) +
		(calcProduction(buildings.sawmill) * 2) +
		(calcProduction(buildings.mine) * 2)
}

export function calcNeeded(cost: ConstructionResources, currentResources: ConstructionResources): ConstructionResources {
	return {
		gold: Math.max(0, cost.gold - currentResources.gold),
		wood: Math.max(0, cost.wood - currentResources.wood),
		stone: Math.max(0, cost.stone - currentResources.stone)
	}
}

export function calcMinutesNeeded(cost: ConstructionResources, buildings: Buildings, currentResources: ConstructionResources): number {
	const needed = {
		gold: cost.gold - currentResources.gold,
		wood: Math.max(0, cost.wood - currentResources.wood),
		stone: Math.max(0, cost.stone - currentResources.stone)
	}
	const semitotalNeeded = Math.max(0, calcSemitotalGold(needed))

	const income = calcSemitotalGoldIncome({
		...buildings,
		sawmill: needed.wood === 0 ? 0 : buildings.sawmill,
		mine: needed.stone === 0 ? 0 : buildings.mine
	})

	return Math.ceil(semitotalNeeded / income)
}

export function calcMinutesNeededToFillStorage(buildings: Buildings, currentResources: Resources): number {
	const storageSize = calcStorageCapacity(buildings.storage)
	const woodNeeded = storageSize - currentResources.wood
	const stoneNeeded = storageSize - currentResources.stone
	const foodNeeded = storageSize - currentResources.food

	const goldIncome = calcGoldIncome(buildings.townhall, buildings.houses)
	const woodIncome = calcProduction(buildings.sawmill)
	const stoneIncome = calcProduction(buildings.mine)
	const foodIncome = calcProductionFood(buildings.farm, buildings.houses)

	const onlyWoodNeededMinutes = woodNeeded / woodIncome
	const onlyStoneNeededMinutes = stoneNeeded / stoneIncome
	const onlyFoodNeededMinutes = foodNeeded / foodIncome

	// Calculate first the time when everything is producing the whole time
	// This will be wrong when a resource already is full earlier but its needed in order to determine this more or less great
	let combinedNeedFirstApprox = woodNeeded + stoneNeeded + foodNeeded - (currentResources.gold / 2)
	combinedNeedFirstApprox = Math.max(0, combinedNeedFirstApprox)
	const combinedIncomeFirstApprox = woodIncome + stoneIncome + foodIncome + (goldIncome / 2)
	const combinedMinutesNeededFirstApprox = Math.ceil(combinedNeedFirstApprox / combinedIncomeFirstApprox)

	let combinedNeed = -currentResources.gold / 2
	let combinedIncome = goldIncome / 2

	if (onlyWoodNeededMinutes >= combinedMinutesNeededFirstApprox) {
		combinedNeed += woodNeeded
		combinedIncome += woodIncome
	}

	if (onlyStoneNeededMinutes >= combinedMinutesNeededFirstApprox) {
		combinedNeed += stoneNeeded
		combinedIncome += stoneIncome
	}

	if (foodIncome <= 0 ||
			onlyFoodNeededMinutes >= combinedMinutesNeededFirstApprox) {
		combinedNeed += foodNeeded
		combinedIncome += foodIncome
	}

	combinedNeed = Math.max(0, combinedNeed)
	const minutesNeeded = Math.ceil(combinedNeed / combinedIncome)

	return minutesNeeded
}

export function estimateResourcesAfter(currentResources: Resources, buildings: Buildings, minutes: number): Resources {
	const goldIncome = calcGoldIncome(buildings.townhall, buildings.houses)
	const woodIncome = calcProduction(buildings.sawmill)
	const stoneIncome = calcProduction(buildings.mine)
	const foodIncome = calcProductionFood(buildings.farm, buildings.houses)

	const goldLimit = calcGoldCapacity(buildings.townhall)
	const storageLimit = calcStorageCapacity(buildings.storage)

	const estimated = {
		gold: currentResources.gold + (goldIncome * minutes),
		wood: currentResources.wood + (woodIncome * minutes),
		stone: currentResources.stone + (stoneIncome * minutes),
		food: currentResources.food + (foodIncome * minutes)
	}

	const estimatedWithLimits = {
		gold: Math.min(goldLimit, estimated.gold),
		wood: Math.min(storageLimit, estimated.wood),
		stone: Math.min(storageLimit, estimated.stone),
		food: Math.min(storageLimit, Math.max(0, estimated.food))
	}

	return estimatedWithLimits
}

// Gold can be negative afterwards!
export function calcResourcesAfterConstruction(before: Resources, cost: ConstructionResources): Resources {
	const result: Resources = {gold: 0, wood: 0, stone: 0, food: before.food}
	for (const r of CONSTRUCTION_RESOURCES) {
		result[r] = before[r] - cost[r]

		if (result[r] < 0 && r !== 'gold') {
			// Add negative -> reduce gold
			result.gold += result[r] * 2
			result[r] = 0
		}
	}

	return result
}
