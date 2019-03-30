import test from 'ava'

import {NOT_ALLOWED_CHARS} from '../../source/gamescreen/helpers/text-cleanup'

import {EMOJI} from '../../source/gamescreen/emoji'

for (const key of Object.keys(EMOJI)) {
	test(`no not allowed chars in ${key}`, t => {
		const hasBadChar = NOT_ALLOWED_CHARS.some(o => EMOJI[key].includes(o))
		t.false(hasBadChar)
	})
}
