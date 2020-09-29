/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {
			type: 'main',
			player: {
				bonus: undefined,
				achievements: undefined,
				alliance: '🐱',
				name: 'not used name'
			},
			resources: {
				gold: 2768991,
				wood: 8065450,
				stone: 11765450,
				food: 11434985
			},
			weather: 'storm'
		},
		text: `[🐱]not used name
Stalker

Status            City
Territory      29761🗺

Season        Summer🍃
Weather        Storm⛈
Time        14:22:03🕓

People          9680👥
Army            5000⚔️
Gold         2768991💰
Wood         8065450🌲
Stone       11765450⛏
Food        11434985🍖`
	}, {
		information: {buildings: {
			townhall: 342,
			storage: 476,
			houses: 484,
			farm: 100,
			sawmill: 63,
			mine: 63,
			barracks: 125,
			wall: 80
		}},
		text: `Buildings

🏤   342⛔️
🏚   476⛔️ 4760/4760👥
🏘   484⛔️ 9680/9680👥
🌻   100​✅ 1000/1000👥
🌲    63​✅   630/630👥
⛏    63​✅   630/630👥
🛡   125⛔️ 5000/5000⚔️
🏰    80⛔️   800/800🏹

What will we build?`
	}, {
		information: {buildings: {
			townhall: 1,
			storage: 0,
			houses: 1,
			farm: 0,
			sawmill: 0,
			mine: 0,
			barracks: 0,
			wall: 0
		}},
		text: `Buildings

🏤     1⛔️
🏘     1⛔️     10/20👥

First build the 🏚Storage to add resources. In 🏚Storage can be stored 🌲Wood, ⛏Stone и 🍖Food. Every worker in one game day brings 1 resource from each production buildind.`
	}, {
		information: {
			type: 'storage',
			resources: {
				gold: 3439446,
				wood: 11578680,
				stone: 11778680,
				food: 11349345
			}
		},
		text: `🏚Storage

Level            476
Workers   4760/4760👥

Resources
  11578680/11804800🌲
  11778680/11804800⛏
  11349345/11804800🍖

Hire           1💰/1👥

Gold        3439446💰
People         9680👥

Fill        1415390💰

Upgrade
         22800600💰⛔️
         11400300🌲​✅
         11400300⛏​✅`
	}, {
		information: {workshop: {
			trebuchet: 0,
			ballista: 0
		}},
		text: 'Workshop'
	}, {
		information: {workshop: {
			trebuchet: 21,
			ballista: 0
		}},
		text: `Workshop

⚔Trebuchet 21⛔️   5/5👥`
	}, {
		information: {workshop: {
			trebuchet: 21,
			ballista: 1
		}},
		text: `Workshop

⚔Trebuchet 21​✅   5/5👥
⚔Ballista   1​✅   1/1👥`
	}, {
		information: {
			type: 'trebuchet'
		},
		text: `⚔️Trebuchet

Level             21
Workers         5/5👥

Hire           1💰/1👥

Atk. bonus      +10⚔️
Attack          420⚔️

Gold        3102582💰
People         9680👥

Upgrade
          2024000💰​✅
           253000🌲​✅
            75900⛏​✅`
	}, {
		information: {
			type: 'resources',
			resources: {
				gold: 2768991,
				wood: 8065450,
				stone: 11765450,
				food: 11434985
			}
		},
		text: `Resources
Gold         2768991💰
Wood         8065450🌲
Stone       11765450⛏
Food        11434985🍖`
	}, {
		information: {
			type: 'resources',
			resources: {
				gold: 135551,
				wood: 11900,
				stone: 6711900,
				food: 11761385
			}
		},
		text: `Resources
Gold          135551💰
Wood           11900🌲
Stone        6711900⛏
Food        11761385🍖

Buy
Wood       200💰/100🌲
Stone      200💰/100⛏
Food       200💰/100🍖


500000⛏ delivered to 🏚Storage`
	}
]
	.map(o => ({...o, language: 'en'})) as Testexample[]

testrunnerMany(examples)
