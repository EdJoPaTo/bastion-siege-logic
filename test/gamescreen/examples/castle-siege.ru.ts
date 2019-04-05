/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './helpers'

const examples: Testexample[] = [
	{
		type: 'castleSiegePlayerJoined',
		information: {castleSiegePlayerJoined: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Bob'
		}},
		text: '⚔️🏰 [🌶]Bob присоединился к осаде на Сапфировый замок.'
	}, {
		type: 'castleSiegePlayerJoined',
		information: {castleSiegePlayerJoined: {
			achievements: '🎖⛏🏰',
			alliance: '🌶',
			bonus: undefined,
			name: 'Bob'
		}},
		text: '⚔️🏰 {🎖⛏🏰}[🌶]Bob присоединился к осаде на Сапфировый замок.'
	}, {
		information: {castleSiegePlayerJoined: {
			achievements: '💎🎖🏰⛏',
			alliance: '🌶',
			bonus: undefined,
			name: 'YahWeh'
		}},
		text: '⚔️🏰 {💎🎖🏰⛏}[🌶]YahWeh выступил против осады на Сапфировый замок.'
	}, {
		type: 'castleSiegeLeaderJoined',
		information: {castleSiegePlayerJoined: {
			achievements: undefined,
			alliance: '🌶',
			bonus: undefined,
			name: 'Vanderlog'
		}},
		text: '⚔️🏰 Лидер твоего альянса [🌶]Vanderlog присоединился к осаде на Рубиновый замок. Выступить ему на подмогу?'
	}, {
		information: {
			type: 'castleSiegeYouJoined'
		},
		text: '⚔️🏰 Твоя армия присоединилась к осаде на Сапфировый замок.'
	}, {
		type: 'castleSiegeAllianceJoined',
		information: {castleSiegeAllianceJoined: {
			alliance: '🌙'
		}},
		text: 'Альянс [🌙​]Silver Millennium присоединился к осаде на Рубиновый замок.'
	}, {
		type: 'castleSiegeParticipants',
		information: {castleSiegeParticipants: [
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
		]},
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
	}
]
	.map(o => ({...o, language: 'en'}))

testrunnerMany(examples)
