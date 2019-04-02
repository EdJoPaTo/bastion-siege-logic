import test from 'ava'

import {isMystic} from '../../source/gamescreen/mystics'

test('dragon en', t => {
	const dragon = '🐲Dragon'
	t.is(isMystic(dragon), 'dragon')
})

test('undead en', t => {
	const undead = '☠️Undead army'
	t.is(isMystic(undead), 'undead')
})

test('dragon ru', t => {
	const dragon = '🐲Драконом'
	t.is(isMystic(dragon), 'dragon')
})

test('undead ru', t => {
	const undead = 'армией ☠️Нежити'
	t.is(isMystic(undead), 'undead')
})
