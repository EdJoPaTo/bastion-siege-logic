/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {
			type: 'war',
			domainStats: {
				wins: 4817,
				karma: 5059,
				terra: 23579
			}
		},
		text: `Победы         4817🎖
Кристаллы       112💎
Карма          5059☯
Территория    23579🗺
Время      10:54:36🕓
Погода       Метель🌪

🏰Стена   11300/11300⚒
          1130/1130🏹

⚔Требушет    18/18👥

      15000/15000⚔​✅
         21560130🍖​✅`
	}, {
		information: {
			type: 'war',
			domainStats: {
				wins: 100,
				karma: 1500,
				terra: 12000
			},
			battle: {
				attack: ['Devana', 'not used name'],
				defence: ['Amaterasu', 'Izyde']
			}
		},
		text: `Победы         100🎖
Кристаллы        43💎
Карма          1500☯
Территория    12000🗺
Время      10:30:00🕓
Погода         Снег🌨

🏰Стена   11300/11300⚒
          1130/1130🏹

⚔Требушет    17/17👥

      15000/15000⚔​✅
         19783239🍖​✅

Без нападений - 5 мин.
Продолжается бой с альянсом [⚡​]Адептус Астартес
Атака: Devana, not used name
Защита: Amaterasu, Izyde`
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
					alliance: undefined,
					achievements: undefined,
					bonus: '☃',
					name: 'Барc'
				}
			}
		},
		text: `Победы         2570🎖
Кристаллы       110💎
Карма            -6☯
Территория    45958🗺
Время      14:38:18🕓
Погода    Солнечно☀️

🏰Стена   10000/10000⚒
          1000/1000🏹

⚔Требушет    15/15👥

          0/15000⚔⛔️
         19259632🍖​✅

Без нападений - 21 мин.
Продолжается бой с ☃️Барc`
	}, {
		information: {effects: [
			{
				emoji: '🛡',
				name: 'Иммунитет от нападений',
				minutesRemaining: 14
			}, {
				emoji: '🤵🏻',
				name: 'Управляющий',
				timestamp: 1546046050
			}, {
				emoji: '⚔️',
				name: 'Святые клинки',
				timestamp: 1545209005
			}, {
				emoji: '🔥️',
				name: 'Костры инквизиции',
				timestamp: 1545208996
			}
		]},
		text: `🛡 - Иммунитет от нападений. Противники не смогут найти тебя в разведке. Продлится еще: 14 мин.
🤵🏻 - Управляющий. Поможет тебе быстро приобрести недостающие ресурсы для улучшения построек при наличии достаточного количества золота. Просто жми ⚒Улучшить. Также, 🤵🏻Управляющий может укомплектовать ваши казармы или стену всего за одну команду. Достаточно нажать кнопку Заполнить в соответствующей постройке. 🤵🏻Управляющий будет стоять рядом, держа лампу, пока ты добываешь кристаллы, что даст +5% к успеху. Продлится до: 2018-12-29 01:14:10 +0000 UTC
⚔️ - Святые клинки. Добавляет +100 к шансу победы в битве с ☠️️Нежитью. Продлится до: 2018-12-19 08:43:25 +0000 UTC
🔥️ - Костры инквизиции. Уменьшает вдвое длительность эффекта 💀Чума и предотвращающий появление последнего на 3 дня. Можно купить несколько раз. Продлится до: 2018-12-19 08:43:16 +0000 UTC`
	}, {
		information: {
			type: 'patrolreport'
		},
		text: `⚔ Завязалась кровавая битва. В воздухе стоял запах крови, а земля окрасилась в багровый цвет. К рассвету, твоим воинам удалось одержать победу, однако потери среди солдат были не малы. Домой вернулись 57⚔. Измученные и израненные они смогли унести лишь часть богатств разбойников. Твоя казна пополнилась на 36130💰.
Для 57⚔ из 57⚔ не нашлось мест в 🛡Казармах и их пришлось распустить. Они пополнят ряды свободных 👥Жителей.
57⚔ из 57⚔ уволенных солдат не нашли себе жилых мест в твоих владениях. Все они были вынуждены безмолвно уйти в закат...`
	}, {
		information: {type: 'dig'},
		text: `⛏ Ты бы мог еще долго хлестать скалу уже изрядно потрепанной киркою, но силы покинули тебя в последний момент и ты, опечаленный неудачей, возвращаешься из шахты, чтобы немного передохнуть. К сожалению, ты ничего не нашел.
Копать дальше: /dig`
	}, {
		information: {type: 'dig'},
		text: `⛏ Потратив кучу времени и сил, весь в поту и грязи ты не сдаешься и продолжаешь бить киркою скалу раз за разом. И вот, казалось бы, уже не видать счастливого конца этой истории, как вдруг камень с громким треском раскололся пополам и в твое лицо ударил яркий голубой свет чистейшего драгоценного 💎Кристалла. Поздравляю! Твоя казна пополнилась на 1💎.
Копать дальше: /dig`
	}, {
		information: {type: 'siegeStarted'},
		text: '⚔Осада началась!'
	}
]
	.map(o => ({...o, language: 'ru'})) as Testexample[]

testrunnerMany(examples)
