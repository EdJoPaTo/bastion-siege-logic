import {BattlereportRaw} from '../battlereport'
import {Buildings, Workshop, ConstructionName} from '../buildings'
import {Castle} from '../castle'
import {Resources} from '../resources'

import {Player} from './player'
import {Weather} from './weather'

export interface AllianceBattleStart {
	readonly attack: boolean;
	readonly ally: Player;
	readonly enemy: Player;
}

export interface Attackscout {
	readonly player: Player;
	readonly terra: number;
	readonly karma: number;
}

export interface BattleSolo {
	readonly enemy: Player;
}

export interface BattleAlliance {
	readonly attack: string[];
	readonly defence: string[];
}

export interface CastleSiegeAllianceJoined {
	readonly alliance: string;
}

export interface CastleSiegeParticipant {
	readonly alliance: string;
	readonly name: string;
	readonly players: string[];
}

export interface CastleSiegeEnds {
	readonly oldAlliance?: string;
	readonly newAlliance?: string;
}

export interface Chat {
	readonly sender: string;
	readonly text: string;
}

export interface DomainStats {
	readonly wins: number;
	readonly karma: number;
	readonly terra: number;
}

export interface Effect {
	readonly emoji: string;
	readonly name: string;
	readonly timestamp?: number;
	readonly minutesRemaining?: number;
}

export interface ListEntry {
	readonly type: string;
	readonly name: string;
	readonly value: string;
	readonly meta?: string;
}

export type GamescreenType =
	ConstructionName |
	'allianceBattleYourArmyJoined' |
	'allianceMembers' |
	'castleSiegeAvailable' |
	'castleSiegePlayerJoined' |
	'castleSiegeStarts' |
	'castleSiegeYouJoined' |
	'dig' |
	'main' |
	'nextCastleSiege' |
	'patrolreport' |
	'personalAllianceOverview' |
	'rankingGold' |
	'rankingKarma' |
	'rankingSearch' |
	'rankingTerra' |
	'rankingWins' |
	'resources' |
	'siegeStarted' |
	'war'

export interface GamescreenContent {
	readonly type?: GamescreenType;

	readonly allianceBattleStart?: AllianceBattleStart;
	readonly allianceBattleSupport?: Player;
	readonly allianceJoinRequest?: Player;
	readonly allianceLeader?: Player;
	readonly alreadyInFight?: Player;
	readonly attackIncoming?: Player;
	readonly attackscout?: Attackscout;
	readonly battle?: BattleAlliance | BattleSolo;
	readonly battlereport?: BattlereportRaw;
	readonly buildings?: Buildings;
	readonly castle?: Castle;
	readonly castleSiegeAllianceJoined?: CastleSiegeAllianceJoined;
	readonly castleSiegeEnds?: CastleSiegeEnds;
	readonly castleSiegeParticipants?: CastleSiegeParticipant[];
	readonly castleSiegePlayerJoined?: Player;
	readonly chat?: Chat;
	readonly conqueror?: Player;
	readonly domainStats?: DomainStats;
	readonly effects?: Effect[];
	readonly list?: ListEntry[];
	readonly notRecoveredFromFight?: Player;
	readonly player?: Player;
	readonly resources?: Resources;
	readonly weather?: Weather;
	readonly workshop?: Workshop;
}

export interface Gamescreen extends GamescreenContent {
	readonly timestamp: number;
	readonly ingameTimestamp: number;
}
