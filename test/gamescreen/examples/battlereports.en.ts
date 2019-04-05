/* eslint no-irregular-whitespace: 0 */

import {Mystic} from '../../../source/gamescreen/mystics'

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '⚡',
			enemies: [
				'Maximys_dd'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 11436,
			gold: 64783
		}},
		text: `‼️The battle with {🎖💎⛏}[⚡]Maximys_dd complete. Congratulations, not used name! Your army won. The winners 11436⚔ of 12000⚔ proudly return home. Your reward is 64783💰.
For 11436⚔ of 11436⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.
1266⚔ of the 11436⚔ dismissed soldiers did not find myself dwelling places in your domain.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemies: [
				'Kkk66'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 9661,
			soldiersAlive: 6218,
			gold: 383274
		}},
		text: `‼️The battle with {🎖}Kkk66 complete. Congratulations, not used name! Your army won. The winners 6218⚔ of 9661⚔ proudly return home. Your reward is 383274💰.
For 6218⚔ of 6218⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '🐺',
			enemies: [
				'Destroyer'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 9661,
			gold: 2622665
		}},
		text: '‼️The battle with {🎖}[🐺]Destroyer complete. Congratulations, not used name! Your army won. The winners 9661⚔ of 12000⚔ proudly return home. Your reward is 2622665💰.'
	}, {
		information: {battlereport: {
			won: false,
			attack: true,
			enemies: [
				'Bob'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 15000,
			soldiersAlive: 1,
			gold: -4400940
		}},
		text: '‼️The battle with Bob complete. Unfortunately, not used name, your army lose. Only 1⚔ of 15000⚔ returned from the battlefield... You lose 4400940💰.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '🐮',
			enemies: [
				'General Balltz'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 38,
			soldiersAlive: 0,
			terra: -102,
			gold: -4400940
		}},
		text: '‼️The battle with {🎖}[🐮]General Balltz complete. Unfortunately, not used name, your army lose. None of the 38⚔ returned from the battlefield... You lose 4400940💰, and 102🗺 joined to {🎖}[🐮]General Balltz.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '🌲',
			enemies: [
				'ЭЛИС'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 8212,
			soldiersAlive: 38,
			terra: -106,
			gold: -6094875
		}},
		text: '‼️The battle with {⛏🎖🏰}[🌲]ЭЛИС complete. Unfortunately, not used name, your army lose. Only 38⚔ of 8212⚔ returned from the battlefield... You lose 6094875💰, and 106🗺 joined to {⛏🎖🏰}[🌲]ЭЛИС.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Jesus_Hrist'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 12000,
			karma: 2,
			terra: 59,
			gold: 40380
		}},
		text: '‼️The battle with Jesus_Hrist complete. Congratulations, not used name! Your army won. The winners 12000⚔ without a loss proudly return home. Your reward is 40380💰, and 59🗺 joined to your domain. Your karma has been modified by 2☯.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Орехи'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 11996,
			terra: 87,
			karma: 3,
			gold: 10776
		}},
		text: '‼️The battle with Орехи complete. Congratulations, not used name! Your army won. The winners 11996⚔ of 12000⚔ proudly return home. Your reward is 10776💰, and 87🗺 joined to your domain. Your karma has been modified by 3☯.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Торпеда'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 11015,
			soldiersAlive: 11015,
			terra: 24,
			karma: 0,
			gold: 3408
		}},
		text: '‼️The battle with Торпеда complete. Congratulations, not used name! Your army won. The winners 11015⚔ without a loss proudly return home. Your reward is 3408💰, and 24🗺 joined to your domain.'
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '🌶',
			enemies: [
				'Undeads'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 8092,
			gold: 1044287
		}},
		text: '‼️The battle with 😈[🌶]Undeads complete. Congratulations, not used name! Your army won. The winners 8092⚔ of 12000⚔ proudly return home. Your reward is 1044287💰.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Danijil'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 12000,
			karma: 2,
			terra: 85,
			gold: 28603
		}},
		text: `‼️The battle with Danijil complete. Congratulations, not used name! Your army won. The winners 12000⚔ without a loss proudly return home. Your reward is 28603💰, and 85🗺 joined to your domain. Your karma has been modified by 2☯.
For 460⚔ of 12000⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.
460⚔ of the 460⚔ dismissed soldiers did not find myself dwelling places in your domain.`
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '⛱',
			enemies: [
				'Меверик'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 0,
			terra: -140,
			gold: -9091973
		}},
		text: '‼️The battle with 🗡[⛱]Меверик complete. Unfortunately, not used name, your army lose. None of the 12000⚔ returned from the battlefield... You lose 9091973💰, and 140🗺 joined to 🗡[⛱]Меверик.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '☢',
			enemies: [
				'House Targaryen'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 0,
			terra: -150,
			gold: -10760574
		}},
		text: '‼️The battle with 🎃[☢]House Targaryen complete. Unfortunately, not used name, your army lose. None of the 12000⚔ returned from the battlefield... You lose 10760574💰, and 150🗺 joined to 🎃[☢]House Targaryen.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '⚡',
			enemies: [
				'Лион ЭльДжонсон', 'tankist', 'Древень', 'Ланселотович', 'Rey De-f', 'Maximys_dd', 'Веледис', 'BepTeJl_Te69'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 45,
			terra: -111,
			gold: -11014520
		}},
		text: `‼️The battle with alliance [⚡​]Адептус Астартес complete. Unfortunately, not used name, your army lose. Only 45⚔ of 12000⚔ returned from the battlefield... You lose 11014520💰, and 111🗺 joined to [⚡​]Адептус Астартес.
Winners: Лион ЭльДжонсон, tankist, Древень, Ланселотович, Rey De-f, Maximys_dd, Веледис, BepTeJl_Te69
Losers: not used name
For 45⚔ of 45⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '🐂',
			enemies: ['Vlomissimo', 'AUroom', 'Киллер'],
			friends: ['not used name'],
			soldiersTotal: 10040,
			soldiersAlive: 2163,
			gold: 546724
		}},
		text: `‼️The battle with alliance [🐂​]Buffalo complete. Congratulations, not used name! Your army won. The winners 2163⚔ of 10040⚔ proudly return home. Your reward is 546724💰.
Winners: not used name
Losers: Vlomissimo, AUroom, Киллер
For 2163⚔ of 2163⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '🐺',
			enemies: ['Demonhunter'],
			friends: ['Raphi', 'not used name'],
			soldiersTotal: 10040,
			soldiersAlive: 1079,
			gold: 557368
		}},
		text: `‼️The battle with [🐺]Demonhunter complete. Congratulations, not used name! Your alliance won. The winners 1079⚔ of 10040⚔ proudly return home. Your reward is 557368💰.
Winners: Raphi, not used name
Losers: Demonhunter`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyAlliance: '🐺',
			enemies: ['C'],
			friends: ['A', 'B'],
			soldiersTotal: 0,
			soldiersAlive: 0,
			gold: 557368
		}},
		text: `‼️The battle with [🐺]C complete. Congratulations, not used name! Your alliance won. The winners 0⚔ without a loss proudly return home. Your reward is 557368💰.
Winners: A, B
Losers: C`
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemyAlliance: '🥖',
			enemies: ['Батон'],
			friends: ['A', 'B'],
			soldiersTotal: 15000,
			soldiersAlive: 0,
			gold: 6429697,
			karma: 4,
			terra: 2003
		}},
		text: `‼️The battle with {🎖}[🥖]Батон complete. Congratulations, A! Your alliance won. But, unfortunately, each of 15000⚔ gave his life for this victory... Your reward is 6429697💰, and 2003🗺 joined to your domain. Your karma has been modified by 4☯.
Winners: A, B
Losers: Батон`
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: ['Z'],
			friends: ['A', 'B', 'C'],
			soldiersTotal: 10000,
			soldiersAlive: 10000,
			gold: 3170484,
			karma: -1,
			terra: 26
		}},
		text: `‼️The battle with 🎄{⛏🎖}Z complete. Congratulations, A! Your alliance won. The winners 10000⚔ without a loss proudly return home. Your reward is 3170484💰, and 26🗺 joined to your domain. Your karma has been modified by -1☯.
Winners: A, B, C
Losers: Z`
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '🛰',
			enemies: ['L', 'F', 'G'],
			friends: ['A', 'B', 'C'],
			soldiersTotal: 7320,
			soldiersAlive: 0,
			gold: -490222,
			terra: -2132
		}},
		text: `‼️The battle with alliance [🛰​]Имперская гвардия complete. Unfortunately, B, your alliance lose. None of the 7320⚔ returned from the battlefield... You lose 490222💰, and 2132🗺 joined to [🛰​]Имперская гвардия.
Winners: L, F, G
Losers: A, B, C`
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: ['Z'],
			friends: ['A'],
			soldiersTotal: 10000,
			soldiersAlive: 10000,
			gold: 237528,
			terra: 19,
			karma: -5
		}},
		text: '‼️The battle with ☃️Z complete. Congratulations, A! Your army won. The winners 10000⚔ without a loss proudly return home. Your reward is 237528💰, and 19🗺 joined to your domain. Your karma has been modified by -5☯.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '🦅',
			enemies: ['Z'],
			friends: ['A'],
			soldiersTotal: 0,
			soldiersAlive: 0,
			gold: -5694326,
			terra: -6785,
			karma: 1
		}},
		text: '‼️The battle with ✨😈[🦅]Z complete. Unfortunately, A, your army lose. None of the 0⚔ returned from the battlefield... You lose 5694326💰, and 6785🗺 joined to ✨😈[🦅]Z. Your karma has been modified by 1☯.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: ['Homer Simpson'],
			friends: ['Bob'],
			soldiersTotal: 15000,
			soldiersAlive: 10000,
			gold: 4767398,
			terra: 3020,
			karma: 3
		}},
		text: `‼️The battle with {🎖⛏💎}Homer
Simpson complete. Congratulations, Bob! Your army won. The winners 10000⚔ of 15000⚔ proudly return home. Your reward is 4767398💰, and 3020🗺 joined to your domain. Your karma has been modified by 3☯.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyMystic: 'dragon' as Mystic,
			enemies: [
				'🐲Dragon'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 14000,
			soldiersAlive: 14000,
			gems: 2,
			gold: 153884652
		}},
		text: '‼️The battle with 🐲Dragon complete. Congratulations, not used name! Your army won. The winners 14000⚔ without a loss proudly return home. The wounded 🐲Dragon is hiding behind the horizon, dropping jewels worth a 153884652💰 and 2💎.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyMystic: 'dragon' as Mystic,
			enemies: [
				'🐲Dragon'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 0,
			soldiersAlive: 0,
			gold: 0
		}},
		text: '‼️The battle with 🐲Dragon complete. Unfortunately, not used name, your army lose. Only 0⚔ of 0⚔ returned from the battlefield... Almost all buildings are covered by fire, and some of the population died. A new effect is obtained: 🔥Flaming city.'
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyMystic: 'undead' as Mystic,
			enemies: [
				'☠Undead army'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 12000,
			soldiersAlive: 4943,
			gems: 3,
			gold: 188386727
		}},
		text: '‼️The battle with ☠️Undead army complete. Congratulations, not used name! Your army won. The winners 4943⚔️ of 12000⚔️ proudly return home. Going around the bodies of enemies, your warriors found many valuable jewels worth a 188386727💰 and 3💎.'
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyMystic: 'undead' as Mystic,
			enemies: [
				'☠Undead army'
			],
			friends: [
				'not used name'
			],
			soldiersTotal: 0,
			soldiersAlive: 0,
			gold: 0
		}},
		text: '‼️The battle with ☠️Undead army complete. Unfortunately, not used name, your army lose. None of the 0⚔️ returned from the battlefield... All food was poisoned, and a part of the population was killed.A new effect is obtained: 💀Plague.'
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
