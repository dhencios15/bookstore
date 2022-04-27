import dayjs from "dayjs";

export const toPeso = (price: number) => `₱ ${price.toFixed(2)}`;
export const toStocks = (stocks: number) =>
  `${stocks > 1 ? "stocks" : "stock"}: ${stocks}`;
export const toSlug = (title: string) =>
  title.toLowerCase().split(" ").join("-");
export const getYearDate = (date: string) => dayjs(date).format("YYYY");
