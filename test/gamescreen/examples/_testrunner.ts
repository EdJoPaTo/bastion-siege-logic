import test, {ExecutionContext} from 'ava'

import {GamescreenContent} from '../../../source/gamescreen/gamescreen-type'
import {parseGamescreenContent} from '../../../source/gamescreen/gamescreen'

export interface Testexample {
	comment?: string;
	language: string;
	information: GamescreenContent;
	text: string;
}

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
