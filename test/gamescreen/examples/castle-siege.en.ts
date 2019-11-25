/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
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
		information: {
			castle: 'ruby',
			type: 'castleSiegeAvailable'
		},
		text: '⚔️🏰 The siege is available on Ruby castle. Leaders of alliances can attack.'
	}, {
		information: {
			castle: 'ruby',
			type: 'castleSiegeAvailable'
		},
		text: '⚔️🏰 Preparation begins for the siege on Ruby castle. Hurry to go in defense of the castle!'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeStarts'
		},
		text: '⚔️🏰 Siege on Sapphire castle began!'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegePlayerJoined: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Bob'
			}
		},
		text: '⚔️🏰 [🌶]Bob joined the siege on Sapphire castle.'
	}, {
		information: {
			castle: 'diamond',
			castleSiegePlayerJoined: {
				achievements: '🏰⛏🎖',
				alliance: '🏅',
				bonus: '😈',
				name: 'The Flying Dutchman'
			}
		},
		text: '⚔️🏰 😈{🏰⛏🎖}[🏅]The Flying Dutchman joined the siege on Diamond castle.'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegePlayerJoined: {
				achievements: undefined,
				alliance: '🐄',
				bonus: undefined,
				name: 'SpeedyWizard'
			}
		},
		text: '⚔️🏰 [🐄]SpeedyWizard go against the siege on Sapphire castle.'
	}, {
		comment: 'castleSiegeLeaderJoined',
		information: {
			castle: 'diamond',
			castleSiegePlayerJoined: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Vanderlog'
			}
		},
		text: '⚔️🏰 The leader of your alliance [🌶]Vanderlog joined the siege at the Diamond castle. Go to him for help?'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your army joined the siege on Sapphire castle.'
	}, {
		information: {
			castle: 'ruby',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your army went to resist the siege on Ruby castle.'
	}, {
		information: {
			castle: undefined,
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your alliance successfully joined the siege of the castle. Your whole army is sent to its walls. All members of your alliance are notified of the siege.'
	}, {
		information: {
			castle: 'diamond',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Your alliance successfully joined the siege at the Diamond castle. Your whole army is sent to its walls. All members of your alliance are notified of the siege.'
	}, {
		information: {
			castle: 'ruby',
			castleSiegeAllianceJoined: {
				alliance: '🌙'
			}
		},
		text: 'The alliance [🌙​]Silver Millennium joined the siege on Ruby castle.'
	}, {
		information: {
			castle: 'diamond',
			castleSiegeParticipants: [
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
			]
		},
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
	}, {
		information: {
			castle: 'ruby',
			castleSiegeEnds: {
				oldAlliance: '🦊',
				newAlliance: '🚀'
			}
		},
		text: '⚔️🏰 Siege on Ruby castle is over!\nThe siege was successful. [🦊​]Лисы loses castle. Ruby castle passes to [🚀​]TONNA.'
	}, {
		information: {
			castle: 'ruby',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: '🏕'
			}
		},
		text: '⚔️🏰 Siege on Ruby castle is over!\nUnfortunately, your alliance was unable to withstand the siege and was losing the castle. Ruby castle passes to [🏕​]Гринвуд.\nNone of the 19960⚔️ returned from the battlefield, but we will remember them...'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: undefined
			}
		},
		text: '⚔️🏰 Siege on Sapphire castle is over!\nCongratulations! The siege was successful and your alliance took Sapphire castle!\nFrom the battlefield returned 13902⚔️ of 17440⚔️.\nFor 13902⚔ of 13902⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.\n13902⚔ of the 13902⚔ dismissed soldiers did not find myself dwelling places in your domain.'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: '🌶'
			}
		},
		text: '⚔️🏰 Siege on Sapphire castle is over!\nThe siege was successful, but, unfortunately, your alliance could not occupy the castle. Sapphire castle passes to [🌶​]Red Hot Peppers.\nFrom the battlefield returned 17520⚔️ of 24000⚔️.'
	}, {
		information: {
			castle: 'ruby',
			castleSiegeEnds: {
				oldAlliance: '🦊',
				newAlliance: '🦊'
			}
		},
		text: '⚔️🏰 Siege on Ruby castle is over!\nThe attacking side could not repulse the lock. Ruby castle remains for [🦊​]Лисы.'
	}, {
		information: {
			castle: 'diamond',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: undefined
			}
		},
		text: '⚔️🏰 Siege on Diamond castle is over!\nCongratulations! Your alliance successfully repulsed the attack! Diamond castle yours.\nNone of the 52000⚔️ returned from the battlefield, but we will remember them...'
	}
]
	.map(o => ({...o, language: 'en'})) as Testexample[]

testrunnerMany(examples)
