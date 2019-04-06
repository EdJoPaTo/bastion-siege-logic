/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		type: 'attackscout',
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
		type: 'attackIncoming',
		information: {attackIncoming: {
			achievements: undefined,
			alliance: '🚀',
			bonus: undefined,
			name: 'Союз-IlIIlIlIlI'
		}},
		text: '‼️Твои владения атакованы! [🚀]Союз-IlIIlIlIlI подступает к границе! Вся твоя ⚔Армия будет отправлена на защиту!'
	}, {
		type: 'allianceBattleStart',
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
		type: 'allianceBattleStart',
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
		type: 'allianceBattleSupport',
		information: {allianceBattleSupport: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Vanderlog'
		}},
		text: '🕊⚔Армия [🌶]Vanderlog присоединилась к атаке!'
	}, {
		type: 'allianceBattleSupport',
		information: {allianceBattleSupport: {
			achievements: '💎⛏🎖',
			alliance: '⚡',
			bonus: undefined,
			name: 'DartDelunore'
		}},
		text: '🕊🛡Армия {💎⛏🎖}[⚡]DartDelunore присоединилась к защите!'
	}, {
		information: {},
		text: '🕊⚔Твоя армия присоединилась к атаке.'
	}, {
		type: 'alliancejoinrequest',
		information: {allianceJoinRequest: {
			achievements: undefined,
			alliance: undefined,
			bonus: undefined,
			name: 'Bob'
		}},
		text: 'В твой альянс желает вступить Bob из Village с территорией 666🗺'
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
