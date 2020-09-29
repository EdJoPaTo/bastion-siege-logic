import test from 'ava'

import {weatherIsHarmless, weatherIsImpairingTrebuchet, weatherIsImpairingWall, parseWeather, parseWeatherFromContent} from '../../source/gamescreen/weather'

test('weather states', t => {
	t.true(weatherIsHarmless('sunny'))
	t.true(weatherIsHarmless('cloudy'))
	t.true(weatherIsHarmless('snow'))
	t.true(weatherIsImpairingWall('storm'))
	t.true(weatherIsImpairingWall('snowstorm'))
	t.true(weatherIsImpairingTrebuchet('rain'))
	t.true(weatherIsImpairingTrebuchet('wetSnow'))
})

test('parseWeather', t => {
	t.is('snow', parseWeather('Snow🌨', 'en'))
	t.is('wetSnow', parseWeather('Wet snow🌧', 'en'))
	t.is('snow', parseWeather('Снег🌨', 'ru'))

	t.throws(() => parseWeather('Gibberish', 'en'))
})

test('parseWeatherFromContent', t => {
	t.is('snow', parseWeatherFromContent('Weather         Snow🌨'))
	t.is('rain', parseWeatherFromContent('Погода         Дождь🌧'))
	t.is('snow', parseWeatherFromContent('Погода          Снег🌨'))

	t.throws(() => parseWeatherFromContent('Gibberish'))
})
