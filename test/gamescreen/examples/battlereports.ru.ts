/* eslint no-irregular-whitespace: 0 */

import {Mystic} from '../../../source/gamescreen/mystics'

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {battlereport: {
			won: true,
			attack: true,
			enemyAlliance: '⛱',
			enemies: [
				'Алишер', 'Cuclas', 'TheBestOne', 'crovax', 'Majesty', 'kjalarr', 'Красный кхмер', 'Тим и Брим', 'Лучик'
			],
			friends: [
				'Оптимус Лис', 'Лисий Бот', 'Горбачев', 'Лисьи усы', 'smol fox', 'в', 'Лисий твинк', 'Number of the beast', 'Эмульгатор соевый', 'Лисья внезапность', 'Лисий нoсик', 'Andrey Brasco', 'Глютен'
			],
			me: 'Лисий твинк',
			soldiersTotal: 26000,
			soldiersAlive: 20019,
			terra: 205117,
			karma: 5,
			gold: 6685041
		}},
		text: `‼️Битва с альянсом [⛱​]Umbrella Corporation окончена. Поздравляю, Лисий твинк! Твой альянс одержал победу. Победители 20019⚔ из 26000⚔ гордо возвращаются домой. Твоя награда составила 6685041💰, a 205117🗺 отошли к твоим владениям. Твоя карма изменилась на 5☯.
Победители: Оптимус Лис, Лисий Бот, Горбачев, Лисьи усы, smol fox, в, Лисий твинк, Number of the beast, Эмульгатор соевый, Лисья внезапность, Лисий нoсик, Andrey Brasco, Глютен
Проигравшие: Алишер, Cuclas, TheBestOne, crovax, Majesty, kjalarr, Красный кхмер, Тим и Брим, Лучик`
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Sturdy'
			],
			friends: [
				'Heo', 'Пифия', 'Агент Смит', 'Оракул', 'Меровинген', 'Тринити'
			],
			me: 'Агент Смит',
			soldiersTotal: 842,
			soldiersAlive: 0,
			terra: 64,
			karma: 3,
			gold: 439422
		}},
		text: `‼️Битва с Sturdy окончена. Поздравляю, Агент Смит! Твой альянс одержал победу. Но, к сожалению, каждый из 842⚔ отдал свою жизнь за эту победу... Твоя награда составила 439422💰, a 64🗺 отошли к твоим владениям. Твоя карма изменилась на 3☯.
Победители: Heo, Пифия, Агент Смит, Оракул, Меровинген, Тринити
Проигравшие: Sturdy`
	}, {
		information: {battlereport: {
			won: false,
			attack: true,
			enemyAlliance: '⚡',
			enemies: [
				'L', 'F', 'G'
			],
			friends: [
				'A', 'B', 'C'
			],
			me: 'B',
			soldiersTotal: 1880,
			soldiersAlive: 0,
			gold: -5746
		}},
		text: `‼️Битва с альянсом [⚡​]Адептус Астартес окончена. К сожалению, B, твой альянс потерпел поражение. Никто из 1880⚔ не вернулся с поля боя... Твоя казна опустела на 5746💰.
	Победители: L, F, G
	Проигравшие: A, B, C`
	}, {
		information: {battlereport: {
			won: false,
			attack: false,
			enemyAlliance: '🚀',
			enemies: [
				'Союз-IlIIlIlIlI'
			],
			friends: [
				'в'
			],
			me: 'в',
			soldiersTotal: 13567,
			soldiersAlive: 0,
			terra: -12672,
			gold: -9544261
		}},
		text: '‼️Битва с [🚀]Союз-IlIIlIlIlI окончена. К сожалению, в, твоя армия потерпела поражение. Никто из 13567⚔ не вернулся с поля боя... Твоя казна опустела на 9544261💰, a 12672🗺 отошли [🚀]Союз-IlIIlIlIlI.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemyAlliance: '🦋',
			enemies: [
				'Херзерберг'
			],
			friends: [
				'в'
			],
			me: 'в',
			soldiersTotal: 10780,
			soldiersAlive: 10780,
			terra: 48,
			karma: 1,
			gold: 812679
		}},
		text: '‼️Битва с [🦋]Херзерберг окончена. Поздравляю, в! Твоя армия одержала победу. Победители 10780⚔ без единой потери гордо возвращаются домой. Твоя награда составила 812679💰, a 48🗺 отошли к твоим владениям. Твоя карма изменилась на 1☯.'
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemyAlliance: '🌶',
			enemies: [
				'Kaiki'
			],
			friends: [
				'Markblit'
			],
			me: 'Markblit',
			soldiersTotal: 2000,
			soldiersAlive: 1000,
			terra: 5040,
			karma: 4,
			gold: 1000
		}},
		text: `‼️Битва с {🎖⛏🏰}[🌶]Kaiki окончена. Поздравляю, Markblit! Твоя армия одержала победу. Победители 1000⚔ из 2000⚔ гордо возвращаются домой. Твоя награда составила 1000💰, a 5040🗺 отошли к твоим владениям. Твоя карма изменилась на 4☯.
Для 500⚔ из 1000⚔ не нашлось мест в 🛡Казармах и их пришлось распустить. Они пополнят ряды свободных 👥Жителей.`
	}, {
		information: {battlereport: {
			won: true,
			attack: true,
			enemyAlliance: '🥚',
			enemies: [
				'Vitaminkа', 'Медуза с бубоном', 'Sabi Star'
			],
			friends: [
				'Круглое Брокколи', 'ОТДЫХОТРОН', 'Willowisp'
			],
			me: 'ОТДЫХОТРОН',
			soldiersTotal: 42,
			soldiersAlive: 0,
			terra: 3000,
			karma: 5,
			gold: 4000000
		}},
		text: `‼️Битва с альянсом [🥚​]Седые яйца окончена. Поздравляю, ОТДЫХОТРОН! Твой альянс одержал победу. Но, к сожалению, каждый из 42⚔ отдал свою жизнь за эту победу... Твоя награда составила 4000000💰, a 3000🗺 отошли к твоим владениям. Твоя карма изменилась на 5☯.
Победители: Круглое Брокколи, ОТДЫХОТРОН, Willowisp
Проигравшие: Vitaminkа, Медуза с бубоном, Sabi Star
Получен новый эффект: 💀Чума.`
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyMystic: 'undead' as Mystic,
			enemies: [
				'армией ☠Нежити'
			],
			friends: [
				'Heo'
			],
			me: 'Heo',
			soldiersTotal: 17240,
			soldiersAlive: 7012,
			gems: 2,
			gold: 39660693
		}},
		text: '‼️Битва с армией ☠️Нежити окончена. Поздравляю, Heo! Твоя армия одержала победу. Победители 7012⚔️ из 17240⚔️ гордо возвращаются домой. Обойдя тела врагов, твои воины нашли много ценнейших украшений на сумму 39660693💰 и 2💎.'
	}, {
		information: {battlereport: {
			won: true,
			attack: false,
			enemyMystic: 'dragon' as Mystic,
			enemies: [
				'🐲Драконом'
			],
			friends: [
				'Heo'
			],
			me: 'Heo',
			soldiersTotal: 17080,
			soldiersAlive: 17080,
			gems: 1,
			gold: 138473832
		}},
		text: '‼️Битва с 🐲Драконом окончена. Поздравляю, Heo! Твоя армия одержала победу. Победители 17080⚔️ без единой потери гордо возвращаются домой. Раненный 🐲Дракон стремительно скрывается за горизонтом роняя драгоценности на сумму 138473832💰 и 1💎.'
	}
]
	.map(o => ({...o, language: 'ru'})) as Testexample[]

testrunnerMany(examples)
