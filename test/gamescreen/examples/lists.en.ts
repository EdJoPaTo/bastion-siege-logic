/* eslint no-irregular-whitespace: 0 */

import {testrunnerMany, Testexample} from './_testrunner'

const examples = [
	{
		information: {
			type: 'rankingWins',
			list: [
				{
					type: '👑',
					name: 'Ned',
					value: '73'
				}, {
					type: '🔅',
					name: 'Svyatoy',
					value: '56'
				}, {
					type: '🔅',
					name: 'Mаlfuriоn Stо~',
					value: '45'
				}, {
					type: '⚜',
					name: 'Bob',
					value: '14'
				}
			]
		},
		text: `🎖 Wins rating for day

👑Ned                  73
🔅Svyatoy              56
🔅Mаlfuriоn Stо~       45
⚜Bob                  14`
	}, {
		information: {
			type: 'rankingGold',
			list: [
				{
					type: '👑',
					name: 'Satlz',
					value: '421.000M'
				}, {
					type: '🔅',
					name: 'UIV',
					value: '377.583M'
				}, {
					type: '🔅',
					name: 'John',
					value: '337.000M'
				}, {
					type: '🔅',
					name: 'Союз-IlIIIllI~',
					value: '327.500M'
				}, {
					type: '⚜',
					name: 'Bob',
					value: '81.149M'
				}
			]
		},
		text: `💰 Gold rating

👑Satlz          421.000M
🔅UIV            377.583M
🔅John           337.000M
🔅Союз-IlIIIllI~ 327.500M
⚜Bob             81.149M`
	}, {
		information: {
			type: 'allianceMembers',
			list: [
				{
					type: '🔅',
					name: 'Karl',
					value: '1600',
					meta: '3 мин.'
				}, {
					type: '👑',
					name: 'Leader',
					value: '800'
				}, {
					type: '🔅',
					name: 'Long Name Joo~',
					value: '400'
				}, {
					type: '🔅',
					name: 'Peter',
					value: '200'
				}, {
					type: '⚜',
					name: 'Bob',
					value: '100',
					meta: '3 min.'
				}
			]
		},
		text: `🔅Karl          1600🛡  3 мин.
👑Leader         800🛡
🔅Long Name Joo~ 400🛡
🔅Peter         200🛡
⚜Bob           100🛡  3 min.`
	}
]
	.map(o => ({...o, language: 'en'})) as Testexample[]

testrunnerMany(examples)
