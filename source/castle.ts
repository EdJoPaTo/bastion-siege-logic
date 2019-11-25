export type Castle = 'diamond' | 'ruby' | 'sapphire'

export const CASTLE_SIEGE_SECONDS = 5 * 60 * 60 // 5 hours
export const CASTLE_HOLD_SECONDS = 3 * 24 * 60 * 60 // 3 days

export const CASTLE_BONUS: Record<Castle, number> = {
	diamond: 0.3,
	ruby: 0.2,
	sapphire: 0.1
}
