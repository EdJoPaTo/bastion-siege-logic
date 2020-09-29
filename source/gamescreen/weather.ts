import * as regexHelper from './helpers/regex'

export type HarmlessWeather = 'sunny' | 'cloudy' | 'snow'
export const HARMLESS_WEATHER: readonly HarmlessWeather[] = ['sunny', 'cloudy', 'snow']

export type TrebuchetImpairingWeather = 'rain' | 'wetSnow'
export const TREBUCHET_IMPAIRING_WEATHER: readonly TrebuchetImpairingWeather[] = ['rain', 'wetSnow']

export type WallImpairingWeather = 'storm' | 'snowstorm'
export const WALL_IMPAIRING_WEATHER: readonly WallImpairingWeather[] = ['storm', 'snowstorm']

export type Weather = HarmlessWeather | TrebuchetImpairingWeather | WallImpairingWeather
export const WEATHER = [...HARMLESS_WEATHER, ...TREBUCHET_IMPAIRING_WEATHER, ...WALL_IMPAIRING_WEATHER]

export const WEATHER_TEXT_EN: Readonly<Record<Weather, string>> = {
	sunny: 'Sunny',
	cloudy: 'Cloudy',
	snow: 'Snow',
	rain: 'Rain',
	wetSnow: 'Wet snow',
	storm: 'Storm',
	snowstorm: 'Snowstorm'
}

export const WEATHER_TEXT_RU: Readonly<Record<Weather, string>> = {
	sunny: 'Солнечно',
	cloudy: 'Облачно',
	snow: 'Снег',
	rain: 'Дождь',
	wetSnow: 'Мокрый снег',
	storm: 'Грозы',
	snowstorm: 'Метель'
}

export function weatherIsHarmless(weather: Weather): weather is HarmlessWeather {
	return (HARMLESS_WEATHER as readonly Weather[]).includes(weather)
}

export function weatherIsImpairingTrebuchet(weather: Weather): weather is TrebuchetImpairingWeather {
	return (TREBUCHET_IMPAIRING_WEATHER as readonly Weather[]).includes(weather)
}

export function weatherIsImpairingWall(weather: Weather): weather is WallImpairingWeather {
	return (WALL_IMPAIRING_WEATHER as readonly Weather[]).includes(weather)
}

export function parseWeather(weatherString: string, lang: 'en' | 'ru'): Weather {
	let resultLength = 0
	let result: Weather | undefined

	for (const weather of WEATHER) {
		const text = lang === 'en' ? WEATHER_TEXT_EN[weather] : WEATHER_TEXT_RU[weather]
		const currentLength = text.length

		// Snow and Snowstorm have the same startsWith...
		if (weatherString.startsWith(text) && currentLength > resultLength) {
			result = weather
			resultLength = currentLength
		}
	}

	if (result) {
		return result
	}

	throw new Error(`could not parse weather (${lang}): ${weatherString}`)
}

export function parseWeatherFromContent(content: string): Weather {
	const stringEn = regexHelper.getOptional(content, /^Weather\s+(.+)$/m)
	if (stringEn) {
		return parseWeather(stringEn, 'en')
	}

	const stringRu = regexHelper.getOptional(content, /^Погода\s+(.+)$/m)
	if (stringRu) {
		return parseWeather(stringRu, 'ru')
	}

	throw new Error(`could not find weather: ${content}`)
}
