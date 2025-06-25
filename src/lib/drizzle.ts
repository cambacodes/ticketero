import type { AnyColumn } from "drizzle-orm";
import { asc, desc } from "drizzle-orm";

const directionMap = {
  asc,
  desc,
} as const;

/**
 * Returns a sorting direction function from drizzle-orm based on the provided string.
 * The function will return the 'asc' or 'desc' function from drizzle-orm based on the
 * value of the provided direction string. If the direction string is undefined or does
 * not match either 'asc' or 'desc', the function will return the sorting direction
 * function corresponding to the provided fallback value.
 *
 * @param direction - The string value of the desired sorting direction.
 * @param fallback - The fallback value if the direction string is invalid. Defaults to 'desc'.
 * @returns A sorting direction function from drizzle-orm.
 */
export function getSortDirection(
  direction: string | undefined,
  fallback: keyof typeof directionMap = "desc"
) {
  return (
    directionMap[direction as keyof typeof directionMap] ??
    directionMap[fallback]
  );
}

/**
 * Retrieves a column from a given map of columns based on the provided key.
 * If the key is undefined or does not exist in the column map, the function
 * returns the column corresponding to the provided fallback key.
 *
 * @param columnMap - A map of column names to their respective AnyColumn instances(You can use getTableColumns from drizzle-orm to get this).
 * @param key - The key representing the desired column name.
 * @param fallback - The fallback key to use if the key is undefined or not found in the column map.
 * @returns The AnyColumn instance associated with the specified key or fallback key.
 */

export function getSortColumn<T extends Record<string, AnyColumn>>(
  columnMap: T,
  key: string | undefined,
  fallback: keyof T
): AnyColumn {
  return columnMap[key as keyof T] ?? columnMap[fallback]!;
}
