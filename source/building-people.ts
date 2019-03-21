import {
	Buildings
} from './buildings'

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
	// TODO: split into multiple functions
	const peoplePerMinute = buildings.houses
	const minutesNeeded = Math.ceil(missingPeople / peoplePerMinute)
	const maxPeople = buildings.houses * 20
	const incomePerPerson = 0.5 + (0.1 * buildings.townhall)

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
