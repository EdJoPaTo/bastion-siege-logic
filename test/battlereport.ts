import test from 'ava'

import {
	Battlereport,
	sameBattleResourceAssumption,
	uniqueBattlereportIdentifier
} from '../source/battlereport'

const reportBasis: Battlereport = {
	time: 42,
	attack: true,
	won: true,
	me: '',
	friends: [],
	enemies: [],
	soldiersAlive: 0,
	soldiersTotal: 0,
	gold: 42
}

test('sameBattleResourceAssumption example', t => {
	const basis = {
		...reportBasis,
		friends: ['A', 'B', 'C', 'D']
	}

	const reports = [
		{...basis, gold: 2000, terra: 10},
		{...basis, gold: 4000, terra: 30}
	]

	t.is(sameBattleResourceAssumption(reports), 3000 * 4)
	t.is(sameBattleResourceAssumption(reports, 'terra'), 20 * 4)
})

test('uniqueBattlereportIdentifier still same battle with seconds between reports', t => {
	const basis = {
		...reportBasis,
		friends: ['A'],
		enemies: ['B']
	}

	const reports = [
		{...basis, time: 2},
		{...basis, time: 3}
	]

	t.is(uniqueBattlereportIdentifier(reports[0]), uniqueBattlereportIdentifier(reports[1]))
})
