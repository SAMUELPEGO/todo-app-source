export const fixDecimals = (number1: number, number2: number):string => {
    const result = number1 * number2;
    return result.toFixed(2);
  }