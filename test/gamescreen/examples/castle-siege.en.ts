/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples: Testexample[] = [
	{
		information: {
			type: 'nextCastleSiege'
		},
		text: `🏰 Castles

Diamond castle
[🌲​]Шервудский лес
Until the next siege: 51 h.

Ruby castle
[🦊​]Лисы
Until the next siege: 24 h.

Sapphire castle
[🛰​]Имперская гвардия
Until the next siege: 5 h.`
	}, {
		information: {castleSiegePlayerJoined: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Bob'
		}},
		text: '⚔️🏰 [🌶]Bob joined the siege on Sapphire castle.'
	}, {
		information: {castleSiegePlayerJoined: {
			achievements: '🏰⛏🎖',
			alliance: '🏅',
			bonus: '😈',
			name: 'The Flying Dutchman'
		}},
		text: '⚔️🏰 😈{🏰⛏🎖}[🏅]The Flying Dutchman joined the siege on Diamond castle.'
	}, {
		information: {castleSiegePlayerJoined: {
			achievements: undefined,
			alliance: '🐄',
			bonus: undefined,
			name: 'SpeedyWizard'
		}},
		text: '⚔️🏰 [🐄]SpeedyWizard go against the siege on Sapphire castle.'
	}, {
		comment: 'castleSiegeLeaderJoined',
		information: {castleSiegePlayerJoined: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Vanderlog'
		}},
		text: '⚔️🏰 The leader of your alliance [🌶]Vanderlog joined the siege at the Diamond castle. Go to him for help?'
	}, {
		information: {
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your army joined the siege on Sapphire castle.'
	}, {
		information: {
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your alliance successfully joined the siege of the castle. Your whole army is sent to its walls. All members of your alliance are notified of the siege.'
	}, {
		information: {
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your alliance successfully joined the siege at the Diamond castle. Your whole army is sent to its walls. All members of your alliance are notified of the siege.'
	}, {
		information: {castleSiegeAllianceJoined: {
			alliance: '🌙'
		}},
		text: 'The alliance [🌙​]Silver Millennium joined the siege on Ruby castle.'
	}, {
		information: {castleSiegeParticipants: [
			{
				alliance: '⛱',
				name: 'Umbrella Corporation',
				players: [
					'Majesty',
					'Incredible',
					'crovax',
					'Cuclas',
					'Макс'
				]
			}, {
				alliance: '🔞',
				name: 'We have loli',
				players: [
					'Onii-Chan'
				]
			}, {
				alliance: '🧨',
				name: 'DRG',
				players: []
			}, {
				alliance: '😇',
				name: 'Angel Of Death',
				players: [
					'hamakedarayanai'
				]
			}
		]},
		text: `⚔️🏰 Formation of the army for the battle against [🌲​]Шервудский лес for Diamond castle complete. The siege is about to begin. In it will take part:
[⛱​]Umbrella Corporation (5)
 - 👑Majesty
 - 🔅Incredible
 - 🔅crovax
 - 🔅Cuclas
 - 🔅🗡Макс
[🔞​]We have loli (1)
 - 👑Onii-Chan
[🧨​]DRG
[😇​]Angel Of Death (1)
 - 👑hamakedarayanai`
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
