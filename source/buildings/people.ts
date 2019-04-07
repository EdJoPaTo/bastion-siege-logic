import {
	calcGoldIncomePerPerson
} from '../resources'

import {
	Buildings
} from './building-types'

export function calcHousesCapacity(housesLevel: number): number {
	return housesLevel * 20
}

export function calcHousesPeopleIncome(housesLevel: number): number {
	return housesLevel
}

export function calcBarracksCapacity(barracksLevel: number): number {
	return barracksLevel * 40
}

export function calcBarracksNeeded(armySize: number): number {
	return Math.ceil(armySize / 40)
}

export function calcWallArcherCapacity(wallLevel: number): number {
	return wallLevel * 10
}

export function calcRecoveryMissingPeople(buildings: Buildings, missingPeople: number): {gold: number; minutesNeeded: number} {
	const peoplePerMinute = calcHousesPeopleIncome(buildings.houses)
	const maxPeople = calcHousesCapacity(buildings.houses)
	const incomePerPerson = calcGoldIncomePerPerson(buildings.townhall)
	const minutesNeeded = Math.ceil(missingPeople / peoplePerMinute)

	let goldLost = 0
	let missingPeopleRest = missingPeople
	while (missingPeopleRest > 0) {
		goldLost += Math.min(missingPeopleRest, maxPeople) * incomePerPerson
		missingPeopleRest -= peoplePerMinute
	}

	return {
		gold: -goldLost,
		minutesNeeded
	}
}
