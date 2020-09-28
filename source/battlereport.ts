import {Mystic} from './gamescreen/mystics'

export type BattlereportResource = 'gold' | 'gems' | 'karma' | 'terra'

export interface Battlereport extends Readonly<BattlereportRaw> {
	readonly time: number;
}

export interface BattlereportRaw {
	readonly attack: boolean;
	readonly won: boolean;
	readonly me: string;
	readonly friends: readonly string[];
	readonly enemies: readonly string[];
	readonly enemyAlliance?: string;
	readonly enemyMystic?: Mystic;

	readonly soldiersAlive: number;
	readonly soldiersTotal: number;

	readonly gold: number;
	readonly gems?: number;
	readonly karma?: number;
	readonly terra?: number;
}

export function uniqueBattlereportIdentifier(report: Battlereport): string {
	const time = Math.floor(report.time / 60)
	return `${time} ${report.friends[0]} ${report.enemies[0]}`
}

/// In lost alliance battles everyone loses a different amount
/// With this the known values are extrapolated
/// Assumes the reports are of the same battle
export function sameBattleResourceAssumption(reports: readonly Battlereport[], resource: BattlereportResource = 'gold'): number {
	const participants = reports[0].friends.length
	const sum = reports
		.map(o => o[resource] as number)
		// eslint-disable-next-line unicorn/no-reduce
		.reduce((a, b) => a + b, 0)

	const average = sum / reports.length
	const assumption = average * participants
	return assumption
}
