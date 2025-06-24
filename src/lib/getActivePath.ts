import { closest } from "fastest-levenshtein";

export const getActivePath = (
  path: string,
  paths: string[],
  pathsToIgnore: string[]
) => {
  const closestPath = closest(path, paths.concat(pathsToIgnore));
  const index = paths.indexOf(closestPath);

  return { activePath: closestPath, activeIndex: index };
};
