import {
	Buildings,
	Constructions,
	Workshop
} from '../../source/buildings/building-types'

export const buildingsOne: Buildings = {
	townhall: 1,
	storage: 1,
	houses: 1,
	farm: 1,
	sawmill: 1,
	mine: 1,
	barracks: 1,
	wall: 1
}

export const workshopOne: Workshop = {
	trebuchet: 1,
	ballista: 1
}

export const constructionsOne: Constructions = {
	...buildingsOne,
	...workshopOne
}
