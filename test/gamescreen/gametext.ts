import test from 'ava'

import {CONSTRUCTIONS} from '../../source'

import {GAMETEXT_CONSTRUCTIONS} from '../../source/gamescreen/gametext'

test('constructions have en and ru', t => {
	const keys = Object.keys(GAMETEXT_CONSTRUCTIONS)
	for (const key of keys) {
		const entry = GAMETEXT_CONSTRUCTIONS[key]
		t.deepEqual(Object.keys(entry), ['en', 'ru'])
	}
})

test('constructions complete', t => {
	t.deepEqual(Object.keys(GAMETEXT_CONSTRUCTIONS), CONSTRUCTIONS, 'construction missing')
})
