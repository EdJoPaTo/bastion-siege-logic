import test from 'ava'

import {
	calcGoldCapacity,
	calcGoldIncome,
	calcGoldIncomePerPerson,
	calcMinutesNeededToFillStorage,
	calcProduction,
	calcProductionFood,
	calcResourcesAfterConstruction,
	calcSemitotalGoldIncome,
	calcStorageCapacity,
	estimateResourcesAfter
} from '../source/resources'

import {buildingsOne} from './_buildings'

test('gold capacity', t => {
	t.is(calcGoldCapacity(1), 500000, 'level 1')
	t.is(calcGoldCapacity(10), 5000000, 'level 10')
	t.is(calcGoldCapacity(100), 50000000, 'level 100')
})

test('gold income', t => {
	t.is(calcGoldIncome(1, 1), 12, 'level 1 1')
	t.is(calcGoldIncome(35, 50), 4000, 'level 35 50')
	t.is(calcGoldIncome(282, 400), 229600, 'level 282 400')
})

test('gold income per Person', t => {
	t.is(calcGoldIncomePerPerson(1), 0.6, 'level 1')
	t.is(calcGoldIncomePerPerson(35), 4, 'level 35')
	t.is(calcGoldIncomePerPerson(195), 20, 'level 195')
})

test('production', t => {
	t.is(calcProduction(1), 10, 'level 1')
	t.is(calcProduction(10), 100, 'level 10')
	t.is(calcProduction(100), 1000, 'level 100')
})

test('food production', t => {
	t.is(calcProductionFood(1, 1), 0)
	t.is(calcProductionFood(10, 5), 50)
	t.is(calcProductionFood(10, 10), 0)
	t.is(calcProductionFood(100, 500), -4000)
})

test('storage capacity', t => {
	t.is(calcStorageCapacity(1), 1050, 'level 1')
	t.is(calcStorageCapacity(10), 15000, 'level 10')
	t.is(calcStorageCapacity(100), 600000, 'level 100')
})

test('semitotal income', t => {
	t.is(calcSemitotalGoldIncome(buildingsOne), 52)
	t.is(calcSemitotalGoldIncome({...buildingsOne, townhall: 35, houses: 50, sawmill: 50, mine: 50}), 6000)
	t.is(calcSemitotalGoldIncome({...buildingsOne, townhall: 282, houses: 400, sawmill: 100, mine: 100}), 233600)
})

test('minutes needed to fill when full', t => {
	const currentResources = {gold: 0, wood: 1050, stone: 1050, food: 1050}
	t.is(calcMinutesNeededToFillStorage(buildingsOne, currentResources), 0)
})

test('minutes needed to fill when enough gold is there', t => {
	const currentResources = {gold: 500000, wood: 0, stone: 0, food: 0}
	t.is(calcMinutesNeededToFillStorage(buildingsOne, currentResources), 0)
})

test('minutes needed to fill with only gold income', t => {
	const currentResources = {gold: 0, wood: 1030, stone: 1050, food: 1050}
	const buildings = {...buildingsOne, townhall: 1, storage: 1, houses: 1, farm: 1, sawmill: 0, mine: 0}
	// 20 wood needed -> 40 gold needed to buy it
	// 12 gold per minute -> 4 minutes generate 48 gold -> 48 > 40
	t.is(calcMinutesNeededToFillStorage(buildings, currentResources), 4)
})

test('minutes needed to fill with only ressource income', t => {
	const currentResources = {gold: 0, wood: 1000, stone: 1050, food: 1050}
	const buildings = {...buildingsOne, townhall: 0, storage: 1, houses: 0, farm: 0, sawmill: 1, mine: 0}
	// 50 wood needed, 10 wood per minute -> 5 minutes needed
	t.is(calcMinutesNeededToFillStorage(buildings, currentResources), 5)
})

test('minutes needed to fill only food', t => {
	const currentResources = {gold: 0, wood: 1050, stone: 1050, food: 1000}
	const buildings = {...buildingsOne, townhall: 0, storage: 1, houses: 0, farm: 1, sawmill: 0, mine: 0}
	// 50 food needed, 10 food per minute -> 5 minutes needed
	t.is(calcMinutesNeededToFillStorage(buildings, currentResources), 5)
})

test('minutes needed to fill when something is full before on its own', t => {
	const currentResources = {gold: 0, wood: 550, stone: 50, food: 1050}
	// Times per Resource
	// wood alone: 500 needed, 10 per minute -> 50 minutes needed
	// stone alone: 1000 needed, 10 per minute -> 100 minutes
	// 12 gold per minute / 6 resources per minute
	// naive: 1500 needed, 20 + 12/2 = 26 per minute -> 57.69 minutes naive
	// stone with gold: 1000 needed, 10 + 6 = 16 per minute -> 62.5 minutes

	// By the time stone with gold is done wood is already finished
	t.is(calcMinutesNeededToFillStorage(buildingsOne, currentResources), 63)
})

test('estimate resources start empty without time', t => {
	const currentResources = {gold: 0, wood: 0, stone: 0, food: 0}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 0), currentResources)
})

test('estimate resources start empty with 1 minute time', t => {
	const currentResources = {gold: 0, wood: 0, stone: 0, food: 0}
	const expected = {gold: 12, wood: 10, stone: 10, food: 0}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 1), expected)
})

test('estimate resources start empty with 5 minute time', t => {
	const currentResources = {gold: 0, wood: 0, stone: 0, food: 0}
	const expected = {gold: 60, wood: 50, stone: 50, food: 0}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 5), expected)
})

test('estimate resources respect storage limits', t => {
	const currentResources = {gold: 500000, wood: 1050, stone: 1050, food: 1050}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 1), currentResources)
})

test('estimate resources start partly filled with 1 minute time', t => {
	const currentResources = {gold: 1000, wood: 500, stone: 500, food: 500}
	const expected = {gold: 1012, wood: 510, stone: 510, food: 500}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 1), expected)
})

test('estimate resources start nearly filled with 1 minute time', t => {
	const currentResources = {gold: 499990, wood: 1045, stone: 1045, food: 1045}
	const expected = {gold: 500000, wood: 1050, stone: 1050, food: 1045}

	t.deepEqual(estimateResourcesAfter(currentResources, buildingsOne, 1), expected)
})

test('estimate food is not less than 0', t => {
	const currentResources = {gold: 0, wood: 0, stone: 0, food: 0}
	const buildings = {...buildingsOne, townhall: 35, houses: 50}

	t.is(estimateResourcesAfter(currentResources, buildings, 1).food, 0)
})

test('estimate loosing food', t => {
	const currentResources = {gold: 0, wood: 0, stone: 0, food: 10000}
	const buildings = {...buildingsOne, storage: 491, houses: 500, farm: 100}

	t.is(estimateResourcesAfter(currentResources, buildings, 1).food, 6000)
})

test('resources after construction only gold', t => {
	const current = {gold: 2000, wood: 0, stone: 0, food: 0}
	const required = {gold: 1000, wood: 0, stone: 0}
	t.deepEqual(calcResourcesAfterConstruction(current, required), {
		gold: 1000, wood: 0, stone: 0, food: 0
	})
})

test('resources after construction exact', t => {
	const current = {gold: 1000, wood: 500, stone: 1000, food: 0}
	const required = {gold: 1000, wood: 500, stone: 1000}
	t.deepEqual(calcResourcesAfterConstruction(current, required), {
		gold: 0, wood: 0, stone: 0, food: 0
	})
})

test('resources after construction buy missing', t => {
	const current = {gold: 3000, wood: 500, stone: 500, food: 0}
	const required = {gold: 1000, wood: 500, stone: 1000}
	t.deepEqual(calcResourcesAfterConstruction(current, required), {
		gold: 1000, wood: 0, stone: 0, food: 0
	})
})

test('resources after construction food unharmed', t => {
	const current = {gold: 1000, wood: 0, stone: 0, food: 10000}
	const required = {gold: 1000, wood: 0, stone: 0}
	t.deepEqual(calcResourcesAfterConstruction(current, required), {
		gold: 0, wood: 0, stone: 0, food: 10000
	})
})
