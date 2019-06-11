export const withToggle = async (
  state: () => any,
  func: (b: boolean) => any
) => {
  func(true);
  const result = await state();
  func(false);
  return result;
};

export const extractAnimeId = (text: string) =>
  text.split("/").reverse()[0];

export const filterOne = <T>(pred: (item: T) => boolean, [head, ...tail]: T[]): T[] => {
  if (pred(head)) {
    return [head, ...filterOne(pred, tail)]
  } else {
    return tail
  }
};
