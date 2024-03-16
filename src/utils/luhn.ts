export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanCardNumber = cardNumber.replace(/\D/g, "");
  if (
    cleanCardNumber.length < 13 ||
    cleanCardNumber.length > 16 ||
    isNaN(Number(cleanCardNumber))
  ) {
    return false;
  }
  let sum = 0;
  let doubleDigit = false;
  for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cleanCardNumber[i]);

    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
};

export const validateCVV = (cvv: number): boolean => {
  return cvv.toString().length === 3 || cvv.toString().length === 4;
};
