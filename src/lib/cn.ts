type ClassValue = string | false | null | undefined

/** Menggabungkan nama kelas; nilai falsy diabaikan. */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ')
