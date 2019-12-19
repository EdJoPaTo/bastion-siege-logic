import test, {ExecutionContext} from 'ava'

import {castleGametext} from '../../source/gamescreen/castle'
import {Castle} from '../../source'

function castleGametextMacro(t: ExecutionContext, castle: Castle, language: 'en' | 'ru', expected: string): void {
	t.is(castleGametext(castle, language), expected)
}

test('castleGametext sapphire en', castleGametextMacro, 'sapphire', 'en', 'Sapphire')
test('castleGametext ruby en', castleGametextMacro, 'ruby', 'en', 'Ruby')
test('castleGametext diamond en', castleGametextMacro, 'diamond', 'en', 'Diamond')
