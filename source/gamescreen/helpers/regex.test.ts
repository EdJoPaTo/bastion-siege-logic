import test from 'ava'

import * as regexHelper from './regex'

test('get successful', t => {
	const result = regexHelper.getOptional('was das denn?', /was (\S+)/)
	t.is(result, 'das')
})

test('get undefined', t => {
	const result = regexHelper.getOptional('was das denn?', /was (\d+)/)
	t.is(result, undefined)
})

test('get specific group', t => {
	const result = regexHelper.getOptional('was das denn?', /(\w+) (\w+) (\w+)?/, 3)
	t.is(result, 'denn')
})

test('getNumber successful', t => {
	const result = regexHelper.getOptionalNumber('40€', /(\d+)€/)
	t.is(result, 40)
})

test('getNumber 0', t => {
	const result = regexHelper.getOptionalNumber('0€', /(\d+)€/)
	t.is(result, 0)
})

test('getNumber unsuccessful', t => {
	const result = regexHelper.getOptionalNumber('null€', /(\d+)€/)
	t.is(result, undefined)
})
