import test, {ExecutionContext} from 'ava'

import {
	calcBarracksCapacity,
	calcBarracksNeeded,
	calcHousesCapacity,
	calcHousesPeopleIncome,
	calcRecoveryMissingPeople,
	calcWallArcherCapacity
} from '../../source/buildings/people'

import {buildingsOne} from '../_buildings'

test('houses capacity', t => {
	t.is(calcHousesCapacity(1), 20, 'level 1')
	t.is(calcHousesCapacity(10), 200, 'level 10')
	t.is(calcHousesCapacity(500), 10000, 'level 500')
})

test('houses people income', t => {
	t.is(calcHousesPeopleIncome(1), 1, 'level 1')
	t.is(calcHousesPeopleIncome(10), 10, 'level 10')
	t.is(calcHousesPeopleIncome(500), 500, 'level 500')
})

test('barracks capacity', t => {
	t.is(calcBarracksCapacity(1), 40, 'level 1')
	t.is(calcBarracksCapacity(10), 400, 'level 10')
	t.is(calcBarracksCapacity(500), 20000, 'level 500')
})

test('barracks needed', t => {
	t.is(calcBarracksNeeded(40), 1)
	t.is(calcBarracksNeeded(41), 2)
	t.is(calcBarracksNeeded(20000), 500)
})

test('wall archer capacity', t => {
	t.is(calcWallArcherCapacity(1), 10, 'level 1')
	t.is(calcWallArcherCapacity(10), 100, 'level 10')
	t.is(calcWallArcherCapacity(100), 1000, 'level 100')
})

function missingPeopleMacro(t: ExecutionContext, missingPeople: number, minutesNeeded: number, gold: number): void {
	const buildings = {...buildingsOne, townhall: 5, houses: 5}
	const result = calcRecoveryMissingPeople(buildings, missingPeople)
	t.deepEqual(result, {
		minutesNeeded,
		gold
	})
}

test('calcRecoveryMissingPeople nothing lost', missingPeopleMacro, 0, 0, -0)
test('calcRecoveryMissingPeople 1 min', missingPeopleMacro, 5, 1, -5)
test('calcRecoveryMissingPeople 2 min', missingPeopleMacro, 10, 2, -15)
test('calcRecoveryMissingPeople nearly 2 min', missingPeopleMacro, 7, 2, -9)
test('calcRecoveryMissingPeople everyone in houses', missingPeopleMacro, 100, 20, -1050)
test('calcRecoveryMissingPeople 5 more than houses can fit', missingPeopleMacro, 105, 21, -1150)

test('calcRecoveryMissingPeople empty object NaN NaN NaN', t => {
	const f: any = calcRecoveryMissingPeople
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	t.deepEqual(f({}, 666), {
		minutesNeeded: Number.NaN,
		gold: Number.NaN
	})
})
