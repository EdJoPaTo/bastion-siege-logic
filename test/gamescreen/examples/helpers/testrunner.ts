import test, {ExecutionContext} from 'ava'

import {parseGamescreenContent} from '../../../../source/gamescreen/gamescreen'

import {Testexample} from './types'

export function testrunner(t: ExecutionContext, example: Testexample): void {
	t.log('language', example.language)
	t.log('comment', example.comment)
	t.log(example.information)
	t.log(example.text)

	const result = parseGamescreenContent(example.text)
	t.deepEqual(result, example.information)
}

export function testrunnerMany(examples: Testexample[]): void {
	for (let i = 0; i < examples.length; i++) {
		test(String(i), testrunner, examples[i])
	}
}
