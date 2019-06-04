import test from 'ava'

import {
	calcMaxBuildingLevel,
	calcMaxBuildingLevelWithStorage,
	calcMaxBuildingLevelWithTownhall,
	calcStorageLevelNeededForUpgrade,
	calcTownhallLevelNeededForUpgrade,
	calcTownhallLevelNeededForGold
} from '../../source/buildings/required'

import {buildingsOne} from '../_buildings'

test('townhall required storage level', t => {
	t.is(calcStorageLevelNeededForUpgrade('townhall', 5), 3)
	t.is(calcStorageLevelNeededForUpgrade('townhall', 10), 8)
	t.is(calcStorageLevelNeededForUpgrade('townhall', 50), 63)
	t.is(calcStorageLevelNeededForUpgrade('townhall', 100), 133)
})

test('trebuchet required townhall level (because of gold capacity)', t => {
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 5), 1)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 10), 1)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 50), 21)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 100), 81)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 250), 502)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 350), 983)
	t.is(calcTownhallLevelNeededForUpgrade('trebuchet', 450), 1624)
})

test('max building level', t => {
	t.is(calcMaxBuildingLevel('trebuchet', {...buildingsOne, townhall: 21, storage: 1000}), 50)
	t.is(calcMaxBuildingLevel('trebuchet', {...buildingsOne, townhall: 81, storage: 1000}), 100)
	t.is(calcMaxBuildingLevel('trebuchet', {...buildingsOne, townhall: 502, storage: 1000}), 250)
	t.is(calcMaxBuildingLevel('townhall', {...buildingsOne, townhall: 1000, storage: 3}), 5)
	t.is(calcMaxBuildingLevel('townhall', {...buildingsOne, townhall: 1000, storage: 8}), 10)
	t.is(calcMaxBuildingLevel('townhall', {...buildingsOne, townhall: 1000, storage: 63}), 50)
})

test('townhall possible with storage level', t => {
	t.is(calcMaxBuildingLevelWithStorage('townhall', 3), 5)
	t.is(calcMaxBuildingLevelWithStorage('townhall', 8), 10)
	t.is(calcMaxBuildingLevelWithStorage('townhall', 63), 50)
	t.is(calcMaxBuildingLevelWithStorage('townhall', 133), 100)
})

test('trebuchet possible with townhall level', t => {
	t.is(calcMaxBuildingLevelWithTownhall('trebuchet', 21), 50)
	t.is(calcMaxBuildingLevelWithTownhall('trebuchet', 81), 100)
	t.is(calcMaxBuildingLevelWithTownhall('trebuchet', 502), 250)
	t.is(calcMaxBuildingLevelWithTownhall('trebuchet', 983), 350)
})

test('townhall level from max gold', t => {
	t.deepEqual(calcTownhallLevelNeededForGold(500000), {
		exact: true,
		level: 1
	})
	t.deepEqual(calcTownhallLevelNeededForGold(5000000), {
		exact: true,
		level: 10
	})
	t.deepEqual(calcTownhallLevelNeededForGold(50000000), {
		exact: true,
		level: 100
	})
	t.deepEqual(calcTownhallLevelNeededForGold(50030000), {
		exact: false,
		level: 101
	})
})
