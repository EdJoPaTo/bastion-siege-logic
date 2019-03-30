import test from 'ava'

import {inputTextCleanup} from '../../source/gamescreen/text-cleanup'

test('already clean text is not changed', t => {
	t.is(inputTextCleanup('hello'), 'hello')
})

test('semi spaces get spaces', t => {
	t.is(inputTextCleanup('hey\tthere'), 'hey there')
})

test('emoji variation selector gets removed', t => {
	t.is(inputTextCleanup('⚔️'), '⚔')
})
