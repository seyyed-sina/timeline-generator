import { twMerge } from "tailwind-merge";

/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
  return twMerge(classes.filter(Boolean).join(" "));
};
