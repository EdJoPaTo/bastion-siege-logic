export interface Buildings {
	readonly townhall: number;
	readonly storage: number;
	readonly houses: number;
	readonly farm: number;
	readonly sawmill: number;
	readonly mine: number;
	readonly barracks: number;
	readonly wall: number;
}

export interface Workshop {
	readonly trebuchet: number;
	readonly ballista: number;
}

export interface Constructions extends Buildings, Workshop {}

export type BuildingName = keyof Buildings
export type WorkshopName = keyof Workshop
export type ConstructionName = keyof Constructions

export const BUILDINGS: readonly BuildingName[] = ['townhall', 'storage', 'houses', 'farm', 'sawmill', 'mine', 'barracks', 'wall']
export const WORKSHOP: readonly WorkshopName[] = ['trebuchet', 'ballista']
export const CONSTRUCTIONS: readonly ConstructionName[] = [...BUILDINGS, ...WORKSHOP]

// Array Content: gold, wood, stone
export const BUILDING_COST_FACTORS: Readonly<{[key: string]: Readonly<[number, number, number]> }> = {
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
