/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		information: {attackscout: {
			player: {
				achievements: undefined,
				alliance: '🎴',
				bonus: undefined,
				name: 'Slave'
			},
			terra: 5446,
			karma: 5
		}},
		text: 'Our scouts found [🎴]Slave in his domain Pledge with 5446🗺 territory. If you win, you\'ll get 5☯ karma points.'
	}, {
		information: {attackscout: {
			player: {
				achievements: '⛏💎🎖',
				alliance: undefined,
				bonus: undefined,
				name: 'Homer Simpson'
			},
			terra: 60407,
			karma: 3
		}},
		text: `Our scouts found {⛏💎🎖}Homer
Simpson in his domain Springfield with 60407🗺 territory. If you win, you'll get 3☯ karma points.`
	}, {
		information: {allianceBattleStart: {
			attack: false,
			ally: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Valravn'
			},
			enemy: {
				achievements: undefined,
				alliance: '🛰',
				bonus: undefined,
				name: 'Eln'
			}
		}},
		text: 'Your ally [🌶]Valravn was attacked by [🛰]Eln from [🛰​]Имперская гвардия! You can send your army to help defend.'
	}, {
		information: {allianceBattleStart: {
			attack: true,
			ally: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Jan Breydel'
			},
			enemy: {
				achievements: '⛏',
				alliance: '🐮',
				bonus: undefined,
				name: 'Myadib'
			}
		}},
		text: 'Your ally [🌶]Jan Breydel attacked {⛏}[🐮]Myadib from the alliance [🐮​]Young Dead Cow! You can join the battle and help him in the attack.'
	}, {
		information: {allianceBattleSupport: {
			achievements: '⛏💎🎖',
			alliance: '⚡',
			bonus: undefined,
			name: 'Dave Mathers'
		}},
		text: '🕊⚔{⛏💎🎖}[⚡]Dave Mathers\'s army joined the attack!'
	}, {
		information: {allianceBattleSupport: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Valravn'
		}},
		text: '🕊🛡[🌶]Valravn\'s army joined the defense!'
	}, {
		information: {attackIncoming: {
			achievements: undefined,
			alliance: '🐮',
			bonus: undefined,
			name: 'Son of Gods'
		}},
		text: '‼️Your domain attacked! [🐮]Son of Gods approaches the border! Your whole ⚔Army will be sent to the defense!'
	}, {
		information: {allianceJoinRequest: {
			achievements: undefined,
			alliance: undefined,
			bonus: undefined,
			name: 'Bob'
		}},
		text: 'Bob from Village with the territory of 666🗺 wants to enter your alliance.'
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
