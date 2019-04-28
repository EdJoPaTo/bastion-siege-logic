import {BattlereportRaw} from '../battlereport'
import {Buildings, Workshop} from '../buildings'
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
}

export interface GamescreenContent {
	type?: string;

	allianceBattleStart?: AllianceBattleStart;
	allianceBattleSupport?: Player;
	allianceJoinRequest?: Player;
	attackIncoming?: Player;
	attackscout?: Attackscout;
	battle?: BattleAlliance | BattleSolo;
	battlereport?: BattlereportRaw;
	buildings?: Buildings;
	castleSiegeAllianceJoined?: CastleSiegeAllianceJoined;
	castleSiegeParticipants?: CastleSiegeParticipant[];
	castleSiegePlayerJoined?: Player;
	chat?: Chat;
	domainStats?: DomainStats;
	effects?: Effect[];
	list?: ListEntry[];
	player?: Player;
	resources?: Resources;
	workshop?: Workshop;
}

export interface Gamescreen extends GamescreenContent {
	timestamp: number;
	ingameTimestamp: number;
}
