/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {attackscout: {
			player: {
				achievements: undefined,
				alliance: undefined,
				bonus: undefined,
				name: 'Terrorchik'
			},
			karma: 3,
			terra: 10815
		}},
		text: 'Разведчики докладывают, что неподалеку расположился Terrorchik в своих владениях Sklep размером 10815🗺. За победу ты получишь 3☯.'
	}, {
		information: {attackIncoming: {
			achievements: undefined,
			alliance: '🚀',
			bonus: undefined,
			name: 'Союз-IlIIlIlIlI'
		}},
		text: '‼️Твои владения атакованы! [🚀]Союз-IlIIlIlIlI подступает к границе! Вся твоя ⚔Армия будет отправлена на защиту!'
	}, {
		information: {attackIncoming: {
			mystic: 'dragon',
			name: '🐲Драконом'
		}},
		text: '‼️Твои владения атакованы! 🐲Дракон рассекает небо над нашими головами! Твоя армия попробует отвлечь его! Надеюсь ⚔️Баллиста готова?'
	}, {
		information: {attackIncoming: {
			mystic: 'undead',
			name: 'армией ☠Нежити'
		}},
		text: '‼️Твои владения атакованы! Армия ☠️Нежити уже у самых стен! Твоя армия выступает на защиту!'
	}, {
		information: {allianceBattleStart: {
			attack: false,
			ally: {
				achievements: undefined,
				alliance: '🌶',
				bonus: undefined,
				name: 'ia_yurievna'
			},
			enemy: {
				achievements: undefined,
				alliance: '🦋',
				bonus: undefined,
				name: 'Витюша'
			}
		}},
		text: 'Твоего союзника [🌶]ia_yurievna атаковал [🦋]Витюша из [🦋​]Хусь! Ты можешь отправить свою армию помогать защищаться.'
	}, {
		information: {allianceBattleStart: {
			attack: true,
			ally: {
				achievements: '🎖',
				alliance: '🌶',
				bonus: undefined,
				name: 'LOOOL'
			},
			enemy: {
				achievements: '⛏',
				alliance: '💋',
				bonus: undefined,
				name: 'Ganda'
			}
		}},
		text: 'Твой союзник {🎖}[🌶]LOOOL атаковал {⛏}[💋]Ganda из альянса [💋​]Ca! Ты можешь вступить в бой и помочь ему в атаке.'
	}, {
		information: {allianceBattleStart: {
			attack: true,
			ally: {
				achievements: '💎',
				alliance: '🏅',
				bonus: undefined,
				name: 'Hodor'
			},
			enemy: {
				achievements: undefined,
				alliance: undefined,
				bonus: undefined,
				name: 'John'
			}
		}},
		text: 'Твой союзник {💎}[🏅]Hodor атаковал John'
	}, {
		information: {allianceBattleSupport: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Vanderlog'
		}},
		text: '🕊⚔Армия [🌶]Vanderlog присоединилась к атаке!'
	}, {
		information: {allianceBattleSupport: {
			achievements: '💎⛏🎖',
			alliance: '⚡',
			bonus: undefined,
			name: 'DartDelunore'
		}},
		text: '🕊🛡Армия {💎⛏🎖}[⚡]DartDelunore присоединилась к защите!'
	}, {
		information: {
			type: 'allianceBattleYourArmyJoined'
		},
		text: '🕊⚔Твоя армия присоединилась к атаке.'
	}, {
		information: {allianceJoinRequest: {
			achievements: undefined,
			alliance: undefined,
			bonus: undefined,
			name: 'Bob'
		}},
		text: 'В твой альянс желает вступить Bob из Village с территорией 666🗺'
	}, {
		information: {
			conqueror: {
				achievements: undefined,
				alliance: '🥚',
				bonus: undefined,
				name: 'Hexadecanoуloхy'
			}
		},
		text: `💾Статистика сервера

Пользователи
🔅Всего             50343
🔅Зарегистрировано  43189
🔅С казармами       10408
🔅Активных за день    670

🗡Завоеватель: [🥚]Hexadecanoуloхy

🏁Дней с запуска     1003`
	}
]
	.map(o => ({...o, language: 'ru'})) as Testexample[]

testrunnerMany(examples)
