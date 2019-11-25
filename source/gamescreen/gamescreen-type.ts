import {BattlereportRaw} from '../battlereport'
import {Buildings, Workshop, ConstructionName} from '../buildings'
import {Castle} from '../castle'
import {Resources} from '../resources'

import {Player} from './player'

export interface AllianceBattleStart {
	attack: boolean;
	ally: Player;
	enemy: Player;
}

export interface Attackscout {
	player: Player;
	terra: number;
	karma: number;
}

export interface BattleSolo {
	enemy: Player;
}

export interface BattleAlliance {
	attack: string[];
	defence: string[];
}

export interface CastleSiegeAllianceJoined {
	alliance: string;
}

export interface CastleSiegeParticipant {
	alliance: string;
	name: string;
	players: string[];
}

export interface Chat {
	sender: string;
	text: string;
}

export interface DomainStats {
	wins: number;
	karma: number;
	terra: number;
}

export interface Effect {
	emoji: string;
	name: string;
	timestamp?: number;
	minutesRemaining?: number;
}

export interface ListEntry {
	type: string;
	name: string;
	value: string;
	meta?: string;
}

export type GamescreenType =
	ConstructionName |
	'allianceBattleYourArmyJoined' |
	'allianceMembers' |
	'castleSiegePlayerJoined' |
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
	type?: GamescreenType;

	allianceBattleStart?: AllianceBattleStart;
	allianceBattleSupport?: Player;
	allianceJoinRequest?: Player;
	allianceLeader?: Player;
	alreadyInFight?: Player;
	attackIncoming?: Player;
	attackscout?: Attackscout;
	battle?: BattleAlliance | BattleSolo;
	battlereport?: BattlereportRaw;
	buildings?: Buildings;
	castle?: Castle;
	castleSiegeAllianceJoined?: CastleSiegeAllianceJoined;
	castleSiegeParticipants?: CastleSiegeParticipant[];
	castleSiegePlayerJoined?: Player;
	chat?: Chat;
	conqueror?: Player;
	domainStats?: DomainStats;
	effects?: Effect[];
	list?: ListEntry[];
	notRecoveredFromFight?: Player;
	player?: Player;
	resources?: Resources;
	workshop?: Workshop;
}

export interface Gamescreen extends GamescreenContent {
	timestamp: number;
	ingameTimestamp: number;
}
