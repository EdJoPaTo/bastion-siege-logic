import {Mystic} from './gamescreen/mystics'

export type BattlereportResource = 'gold' | 'gems' | 'karma' | 'terra'

export interface Battlereport extends BattlereportRaw {
	time: number;
}

export interface BattlereportRaw {
	attack: boolean;
	won: boolean;
	me: string;
	friends: string[];
	enemies: string[];
	enemyAlliance?: string;
	enemyMystic?: Mystic;

	soldiersAlive: number;
	soldiersTotal: number;

	gold: number;
	gems?: number;
	karma?: number;
	terra?: number;
}

export function uniqueBattlereportIdentifier(report: Battlereport): string {
	const time = Math.floor(report.time / 60)
	return `${time} ${report.friends[0]} ${report.enemies[0]}`
}

/// In lost alliance battles everyone loses a different amount
/// With this the known values are extrapolated
/// Assumes the reports are of the same battle
export function sameBattleResourceAssumption(reports: Battlereport[], resource: BattlereportResource = 'gold'): number {
	const participants = reports[0].friends.length
	const sum = reports
		.map(o => o[resource] as number)
		.reduce((a, b) => a + b, 0)

	const average = sum / reports.length
	const assumption = average * participants
	return assumption
}
