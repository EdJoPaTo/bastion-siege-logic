/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {
			type: 'storage',
			resources: {
				wood: 833060,
				stone: 47835650,
				food: 48483094,
				gold: 17610076
			}
		},
		text: `🏚Склад

Уровень          976
Рабочие   9600/9760👥

Ресурсы
    833060/48604800🌲
  47835650/48604800⛏
  48483094/48604800🍖

Отправить      1💰/1👥

Золото     17610076💰
Жители        11568👥

Заполнить  97325192💰

Улучшить
         95550600💰⛔️
         47775300🌲⛔️
         47775300⛏​✅`
	}, {
		information: {buildings: {
			townhall: 695,
			storage: 976,
			houses: 984,
			farm: 100,
			sawmill: 63,
			mine: 100,
			barracks: 375,
			wall: 111
		}},
		text: `Постройки

🏤   695⛔️
🏚   976⛔️ 9600/9760👥
🏘   984⛔️17472/19680👥
🌻   100​✅ 1000/1000👥
🌲    63​✅   630/630👥
⛏   100​✅ 1000/1000👥
🛡   375⛔️15000/15000⚔
🏰   111⛔️    0/1110🏹

Что будем строить?`
	}, {
		information: {workshop: {
			trebuchet: 21,
			ballista: 30
		}},
		text: `Мастерская

⚔Требушет 21​✅   3/5👥
⚔Баллиста 30​✅   7/7👥`
	}, {
		information: {workshop: {
			trebuchet: 0,
			ballista: 0
		}},
		text: 'Мастерская'
	}, {
		information: {
			type: 'trebuchet'
		},
		text: `⚔Требушет

Уровень           21
Рабочие         3/5👥

Отправить      1💰/1👥

Нападение       +10⚔
Атака           420⚔

Золото    220631762💰
Жители        19680👥

Улучшить
          2024000💰​✅
           253000🌲​✅
            75900⛏​✅`
	}, {
		information: {
			type: 'main',
			player: {
				bonus: '🛡',
				achievements: undefined,
				alliance: '🐱',
				name: 'not used name'
			},
			resources: {
				gold: 26151498,
				wood: 838100,
				stone: 47843650,
				food: 48427110
			}
		},
		text: `🛡[🐱]not used name
Stalker

Статус       Посёлок🏘
Территория      8185🗺

Сезон          Весна🌸
Погода      Солнечно☀️
Время       18:49:38🕓

Жители         19440👥
Армия          15000⚔
Кристаллы         11💎
Золото      26151498💰
Дерево        838100🌲
Камень      47843650⛏
Еда         48427110🍖`
	}, {
		information: {
			type: 'resources',
			resources: {
				gold: 107739860,
				wood: 828650,
				stone: 828650,
				food: 48506250
			}
		},
		text: `Ресурсы
Кристаллы         11💎
Золото     107739860💰
Дерево        828650🌲
Камень        828650⛏
Еда         48506250🍖`
	}
]
	.map(o => ({...o, language: 'ru'})) as Testexample[]

testrunnerMany(examples)
