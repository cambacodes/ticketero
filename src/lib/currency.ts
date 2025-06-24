import { MyBig } from "./big";

export const toCent = (ammount: number) => {
  return MyBig(ammount).mul(100).round(2).toNumber();
};

export const fromCent = (ammount: number) => {
  return MyBig(ammount).div(100).round(2).toNumber();
};
export const toCurrencyFromCent = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(amount));
};
