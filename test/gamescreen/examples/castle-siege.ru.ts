/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {
			castle: 'diamond',
			type: 'castleSiegeAvailable'
		},
		text: '⚔️🏰 Доступна осада на Бриллиантовый замок. Лидеры альянсов могут выступить в атаку.'
	}, {
		information: {
			castle: 'ruby',
			type: 'castleSiegeAvailable'
		},
		text: '⚔️🏰 Начинается подготовка к осаде на Рубиновый замок. Успей выступить в защиту замка!'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeStarts'
		},
		text: '⚔️🏰 Осада на Сапфировый замок началась!'
	}, {
		type: 'castleSiegePlayerJoined',
		information: {
			castle: 'sapphire',
			castleSiegePlayerJoined: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Bob'
			}
		},
		text: '⚔️🏰 [🌶]Bob присоединился к осаде на Сапфировый замок.'
	}, {
		type: 'castleSiegePlayerJoined',
		information: {
			castle: 'sapphire',
			castleSiegePlayerJoined: {
				achievements: '🎖⛏🏰',
				alliance: '🌶',
				bonus: undefined,
				name: 'Bob'
			}
		},
		text: '⚔️🏰 {🎖⛏🏰}[🌶]Bob присоединился к осаде на Сапфировый замок.'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegePlayerJoined: {
				achievements: '💎🎖🏰⛏',
				alliance: '🌶',
				bonus: undefined,
				name: 'YahWeh'
			}
		},
		text: '⚔️🏰 {💎🎖🏰⛏}[🌶]YahWeh выступил против осады на Сапфировый замок.'
	}, {
		comment: 'castleSiegeLeaderJoined',
		information: {
			castle: 'ruby',
			castleSiegePlayerJoined: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'Vanderlog'
			}
		},
		text: '⚔️🏰 Лидер твоего альянса [🌶]Vanderlog присоединился к осаде на Рубиновый замок. Выступить ему на подмогу?'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Твоя армия присоединилась к осаде на Сапфировый замок.'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Твоя армия отправилась противостоять осаде на Сапфировый замок.'
	}, {
		information: {
			castle: undefined,
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Твой альянс успешно присоединился к осаде замка. Вся твоя армия отправлена к его стенам. Всем участникам твоего альянса отправлены уведомления о вступлении в осаду.'
	}, {
		information: {
			castle: 'sapphire',
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Твой альянс успешно присоединился к осаде на Сапфировый замок. Вся твоя армия отправлена к его стенам. Всем участникам твоего альянса отправлены уведомления о вступлении в осаду.'
	}, {
		information: {
			castle: 'ruby',
			castleSiegeAllianceJoined: {
				alliance: '🌙'
			}
		},
		text: 'Альянс [🌙​]Silver Millennium присоединился к осаде на Рубиновый замок.'
	}, {
		information: {
			castle: 'ruby',
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
		text: `⚔️🏰 Формирование армии для битвы против [🦊​]Лисы за Рубиновый замок окончено. Осада вот-вот начнется. В ней примут участие:
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
			castle: 'diamond',
			castleSiegeEnds: {
				oldAlliance: '🌲',
				newAlliance: '🦊'
			}
		},
		text: '⚔️🏰 Осада на Бриллиантовый замок окончена!\nОсада прошла успешно. [🌲​]Шервудский лес теряет замок. Бриллиантовый замок переходит [🦊​]Лисы.'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: '🏕'
			}
		},
		text: '⚔️🏰 Осада на Сапфировый замок окончена!\nК сожалению, твой альянс не смог выдержать осаду и теряет замок. Сапфировый замок переходит к [🏕​]Гринвуд.\nНикто из 20000⚔️ не вернулся с поля боя, но мы будем их помнить...'
	}, {
		information: {
			castle: 'ruby',
			castleSiegeEnds: {
				oldAlliance: undefined,
				newAlliance: undefined
			}
		},
		text: '⚔️🏰 Осада на Рубиновый замок окончена!\nПоздравляю! Осада прошла успешно и твой альянс занял Рубиновый замок!\nБой прошел без потерь, и все 22120⚔️ вернулись домой.\nДля 22120⚔ из 22120⚔ не нашлось мест в 🛡Казармах и их пришлось распустить. Они пополнят ряды свободных 👥Жителей.\n22120⚔ из 22120⚔ уволенных солдат не нашли себе жилых мест в твоих владениях. Все они были вынуждены безмолвно уйти в закат...'
	}, {
		information: {
			castle: 'sapphire',
			castleSiegeEnds: {
				oldAlliance: '🦅',
				newAlliance: '🌶'
			}
		},
		text: '⚔️🏰 Осада на Сапфировый замок окончена!\nОсада прошла успешно. [🦅​]Легион теряет замок. Сапфировый замок переходит [🌶​]Red Hot Peppers.'
	}
]
	.map(o => ({...o, language: 'ru'})) as Testexample[]

testrunnerMany(examples)
