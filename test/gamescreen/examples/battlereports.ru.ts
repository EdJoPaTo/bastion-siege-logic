/* eslint no-irregular-whitespace: 0 */

import {Mystic} from '../../../source/gamescreen/mystics'

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		type: 'battlereport',
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
		type: 'battlereport',
		information: {battlereport: {
			won: true,
			attack: true,
			enemies: [
				'Sturdy'
			],
			friends: [
				'Heo', 'Пифия', 'Агент Смит', 'Оракул', 'Меровинген', 'Тринити'
			],
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
		type: 'battlereport',
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
			soldiersTotal: 13567,
			soldiersAlive: 0,
			terra: -12672,
			gold: -9544261
		}},
		text: '‼️Битва с [🚀]Союз-IlIIlIlIlI окончена. К сожалению, в, твоя армия потерпела поражение. Никто из 13567⚔ не вернулся с поля боя... Твоя казна опустела на 9544261💰, a 12672🗺 отошли [🚀]Союз-IlIIlIlIlI.'
	}, {
		type: 'battlereport',
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
			soldiersTotal: 10780,
			soldiersAlive: 10780,
			terra: 48,
			karma: 1,
			gold: 812679
		}},
		text: '‼️Битва с [🦋]Херзерберг окончена. Поздравляю, в! Твоя армия одержала победу. Победители 10780⚔ без единой потери гордо возвращаются домой. Твоя награда составила 812679💰, a 48🗺 отошли к твоим владениям. Твоя карма изменилась на 1☯.'
	}, {
		type: 'battlereport',
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
			soldiersTotal: 17240,
			soldiersAlive: 7012,
			gems: 2,
			gold: 39660693
		}},
		text: '‼️Битва с армией ☠️Нежити окончена. Поздравляю, Heo! Твоя армия одержала победу. Победители 7012⚔️ из 17240⚔️ гордо возвращаются домой. Обойдя тела врагов, твои воины нашли много ценнейших украшений на сумму 39660693💰 и 2💎.'
	}, {
		type: 'battlereport',
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
			soldiersTotal: 17080,
			soldiersAlive: 17080,
			gems: 1,
			gold: 138473832
		}},
		text: '‼️Битва с 🐲Драконом окончена. Поздравляю, Heo! Твоя армия одержала победу. Победители 17080⚔️ без единой потери гордо возвращаются домой. Раненный 🐲Дракон стремительно скрывается за горизонтом роняя драгоценности на сумму 138473832💰 и 1💎.'
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
