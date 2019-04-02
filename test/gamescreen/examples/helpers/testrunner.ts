import test, {ExecutionContext} from 'ava'

import {parseGamescreen} from '../../../../source/gamescreen/gamescreen'

import {Testexample} from './types'

export function testrunner(t: ExecutionContext, example: Testexample): void {
	t.log('type', example.type)
	t.log('language', example.language)
	t.log(example.information)
	t.log(example.text)

	const result = parseGamescreen(example.text)
	t.deepEqual(result, example.information)
}

export function testrunnerMany(examples: Testexample[]): void {
	for (let i = 0; i < examples.length; i++) {
		test(String(i), testrunner, examples[i])
	}
}
