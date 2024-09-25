export const formatter = (str: number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(str);
};
