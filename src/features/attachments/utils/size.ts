export const sizeInMB = (sizeInBytes: number, precision = 2) => {
  return +(sizeInBytes / (1024 * 1024)).toFixed(precision);
};
