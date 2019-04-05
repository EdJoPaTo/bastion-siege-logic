import test, {ExecutionContext} from 'ava'

import {EMOJI} from '../../source/gamescreen/emoji'
import {Player, parsePlayer} from '../../source/gamescreen/player'

import {getEmojiInfo, getUnicode} from './helpers/unicode'

function exampleMacro(t: ExecutionContext, text: string, expected: Player): void {
	t.log(text)
	t.log(getEmojiInfo(text))
	t.log(getUnicode(text))
	t.deepEqual(parsePlayer(text), expected)
}

test('dragon en', exampleMacro, '🐲Dragon', {
	name: EMOJI.dragon + 'Dragon',
	mystic: 'dragon'
})

test('undead en', exampleMacro, '☠️Undead army', {
	name: EMOJI.undead + 'Undead army',
	mystic: 'undead'
})

test('simple', exampleMacro, 'paul', {
	achievements: undefined,
	alliance: undefined,
	bonus: undefined,
	name: 'paul'
})

test('bonus', exampleMacro, '🎃paul', {
	achievements: undefined,
	alliance: undefined,
	bonus: '🎃',
	name: 'paul'
})

test('bonus zombie', exampleMacro, '🧟‍Nope', {
	achievements: undefined,
	alliance: undefined,
	bonus: '🧟',
	name: 'Nope'
})

test('achievements', exampleMacro, '{⛏🎖🏰}paul', {
	achievements: '⛏🎖🏰',
	alliance: undefined,
	bonus: undefined,
	name: 'paul'
})

test('alliance', exampleMacro, '[🌲]paul', {
	achievements: undefined,
	alliance: '🌲',
	bonus: undefined,
	name: 'paul'
})

test('achievements & alliance', exampleMacro, '{⛏🎖🏰}[🌲]paul', {
	achievements: '⛏🎖🏰',
	alliance: '🌲',
	bonus: undefined,
	name: 'paul'
})

test('bonus & achievements & alliance', exampleMacro, '🎃{⛏🎖🏰}[🌲]paul', {
	achievements: '⛏🎖🏰',
	alliance: '🌲',
	bonus: '🎃',
	name: 'paul'
})

test('russian name', exampleMacro, '🗡Макс', {
	achievements: undefined,
	alliance: undefined,
	bonus: '🗡',
	name: 'Макс'
})

// After the zombie there is a zero width joiner
// why? no clue.
// https://en.wikipedia.org/wiki/Zero-width_joiner
test('zero width joiner', exampleMacro, '🧟‍{⛏💎🏰🎖}[🚀]Ned', {
	bonus: '🧟',
	achievements: '⛏💎🏰🎖',
	alliance: '🚀',
	name: 'Ned'
})

test('multiple emoji variant selector 1', exampleMacro, '\u26B0\uFE0F\uFE0F[🕌]Magomed', {
	bonus: '⚰',
	achievements: undefined,
	alliance: '🕌',
	name: 'Magomed'
})

test('multiple emoji variant selector 2', exampleMacro, '⚰️️[🐂]Апокалипсис', {
	bonus: '⚰',
	achievements: undefined,
	alliance: '🐂',
	name: 'Апокалипсис'
})

test('garbage throws', t => {
	t.throws(() => parsePlayer(''), 'could not parse player')
})
