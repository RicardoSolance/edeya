export const validateWordsLength = (v: string, max: number): boolean => {
  const words = v.trim().split(/\s+/);
  return v === "" ? max <= 0 : words.length <= max;
};
