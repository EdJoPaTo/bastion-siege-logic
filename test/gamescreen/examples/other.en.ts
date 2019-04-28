/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		information: {
			type: 'patrolreport'
		},
		text: `⚔ The battle was all night. But your warriors lost. The survivors decided to retreat. 317⚔ returned home, but they haven't brought gold.
For 317⚔ of 317⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.
317⚔ of the 317⚔ dismissed soldiers did not find myself dwelling places in your domain.`
	}, {
		information: {
			type: 'patrolreport'
		},
		text: `⚔ The battle was all night and your warriors won the battle. But your soldiers suffered heavy losses. 7050⚔ returned home. Your treasury is replenished 18593698💰.
For 7050⚔ of 7050⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.
7050⚔ of the 7050⚔ dismissed soldiers did not find myself dwelling places in your domain.`
	}, {
		information: {
			type: 'patrolreport'
		},
		text: `⚔ The battle was easy and you won. However, the bandits started a fire. Your soldiers were able to take only a part of the treasure, until everything was on fire. 1166⚔ returned home. Your treasury is replenished 8172829💰.
For 1166⚔ of 1166⚔ not found a place in the 🛡Barracks and had to disband. They join the ranks of 👥People. The next time take care of availability for the winners.`
	}, {
		information: {
			type: 'war',
			domainStats: {
				wins: 4817,
				karma: 5059,
				terra: 23579
			}
		},
		text: `Wins           4817🎖
Gems            112💎
Karma          5059☯
Territory     23579🗺
Time       10:49:14🕓
Weather   Snowstorm🌪

🏰Walls   11300/11300⚒
          1130/1130🏹

⚔Trebuchet    18/18👥

      15000/15000⚔​✅
         21607780🍖​✅`
	}, {
		information: {
			type: 'war',
			domainStats: {
				wins: 4487,
				karma: 4387,
				terra: 31231
			},
			battle: {
				attack: ['Bob', 'not used name'],
				defence: ['Peter-s']
			}
		},
		text: `Wins           4487🎖
Gems             36💎
Karma          4387☯
Territory     31231🗺
Time       20:56:58🕓
Weather      Sunny☀️

🏰Walls   11300/11300⚒
          1130/1130🏹

⚔Trebuchet    13/13👥

      15000/15000⚔​✅
         19574278🍖​✅

Continues the battle with alliance [🗽​]Revolution
Attack: Bob, not used name
Defence: Peter-s`
	}, {
		information: {
			type: 'war',
			domainStats: {
				wins: 2570,
				karma: -6,
				terra: 45958
			},
			battle: {
				enemy: {
					bonus: '❄',
					achievements: undefined,
					alliance: undefined,
					name: 'Барc'
				}
			}
		},
		text: `Wins           2570🎖
Gems            110💎
Karma            -6☯
Territory     45958🗺
Time       14:38:33🕓
Weather      Sunny☀️

🏰Walls   10000/10000⚒
          1000/1000🏹

⚔Trebuchet    15/15👥

          0/15000⚔⛔️
         19259632🍖​✅

No attacks - 21 min.
Continues the battle with ❄️Барc`
	}, {
		information: {effects: [
			{
				emoji: '🛡',
				name: 'Immunity from attacks',
				minutesRemaining: 28
			}, {
				emoji: '🤵🏻',
				name: 'Steward',
				timestamp: 1546046050
			}, {
				emoji: '⚔️',
				name: '⚔️Holy blades',
				timestamp: 1545209005
			}, {
				emoji: '🔥️',
				name: '🔥️Inquisition fires',
				timestamp: 1545208996
			}, {
				emoji: '🎯',
				name: '🎯Accurate calculation',
				timestamp: 1545366639
			}
		]},
		text: `🛡 - Immunity from attacks. Opponents will not be able to find you in the search. Will continue: 28 min.
🤵🏻 - Steward. He will help you quickly acquire the missing resources to upgrade the buildings with enough gold. Just press ⚒Upgrade. Also, the 🤵🏻Steward can equip your barracks or the walls with just one command. It is enough to press the Fill button in the corresponding building. 🤵🏻Steward will stand side by side, holding the lamp, while you get the gems, which will give +5% to success. Will last until: 2018-12-29 01:14:10 +0000 UTC
⚔️ - ⚔️Holy blades. Adds +100 to the win chance in the battle with undead army. Will last until: 2018-12-19 08:43:25 +0000 UTC
🔥️ - 🔥️Inquisition fires. Reduces the duration of the 💀Plague effect by half and prevents the appearance of the latter. You can buy several times. Will last until: 2018-12-19 08:43:16 +0000 UTC
🎯 - 🎯Accurate calculation. Adds +100 to accuracy in the battle with the 🐲Dragon. Will last until: 2018-12-21 04:30:39 +0000 UTC`
	}, {
		information: {effects: [
			{
				emoji: '🏰',
				name: 'Castle'
			}, {
				emoji: '🛡',
				name: 'Immunity from attacks',
				minutesRemaining: 28
			}
		]},
		text: `🏰 - Castle. The income of gold, resources and population increased on 20%.
🛡 - Immunity from attacks. Opponents will not be able to find you in the search. Will continue: 28 min.`
	}, {
		information: {},
		text: 'Your ⚔️Ballista will receive +100 to accuracy in the battle with the 🐲️Dragon until 2018-12-21 04:30:39 +0000 UTC.'
	}, {
		information: {chat: {
			sender: 'Bob',
			text: `I was here

yeah!`
		}},
		text: `#message /chat
📣 Bob: I was here

yeah!`
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
