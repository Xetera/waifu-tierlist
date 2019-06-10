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
