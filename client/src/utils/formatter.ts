export const toPeso = (price: number) => `₱ ${price.toFixed(2)}`;
export const toStocks = (stocks: number) =>
  `${stocks > 1 ? "stocks" : "stock"}: ${stocks}`;
export const toSlug = (title: string) =>
  title.toLowerCase().split(" ").join("-");
