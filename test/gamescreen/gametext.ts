import test, {ExecutionContext} from 'ava'

import {CONSTRUCTIONS} from '../../source'

import {GAMETEXT} from '../../source/gamescreen/gametext'

function translationMissing(t: ExecutionContext, lang: 'en' | 'ru'): void {
	const keys = Object.keys(GAMETEXT)
	for (const key of keys) {
		const entry = GAMETEXT[key]
		t.truthy(entry[lang], `${key} is missing translation`)
	}
}

test('gametexts have en', translationMissing, 'en')
test('gametexts have ru', translationMissing, 'ru')

function keysIncluded(t: ExecutionContext, keysRequired: string[]): void {
	const keys = Object.keys(GAMETEXT)
	for (const required of keysRequired) {
		t.true(keys.includes(required), `${required} is missing`)
	}
}

test('constructions complete', keysIncluded, CONSTRUCTIONS)
