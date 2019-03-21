export interface Buildings {
	townhall: number;
	storage: number;
	houses: number;
	farm: number;
	sawmill: number;
	mine: number;
	barracks: number;
	wall: number;
}

export interface Workshop {
	trebuchet: number;
	ballista: number;
}

export interface Constructions extends Buildings, Workshop {}

export type ConstructionName = keyof Constructions

// Array Content: gold, wood, stone
export const BUILDING_COST_FACTORS: {[key: string]: [number, number, number] } = {
	townhall: [250, 100, 100],
	storage: [100, 50, 50],
	houses: [100, 50, 50],
	farm: [50, 25, 25],
	sawmill: [50, 25, 25],
	mine: [50, 25, 25],
	barracks: [100, 50, 50],
	wall: [2500, 250, 750],
	trebuchet: [4000, 500, 150],
	ballista: [5000, 350, 50]
}
