export const roundUp = (value: number): number => {
  const roundedNum = Math.ceil(value * 20) / 20;
  return roundedNum;
};

export const trunkCurrency = (value: number): number => {
  return parseFloat(value.toFixed(2));
};

export const formattedValue = (value: number): string => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
