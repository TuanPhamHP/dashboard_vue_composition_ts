export const currencyFormat = (amount: number): string => {
 const result = Intl.NumberFormat("de-DE");
 return result.format(amount);
};
export const currencyPrefix = (amount: number, prefix: string | number): string => {
 const result = currencyFormat(amount);
 return `${prefix}${result}`;
};
export const currencySuffix = (amount: number, suffix: string | number): string => {
 const result = currencyFormat(amount);
 return `${result}${suffix}`;
};
