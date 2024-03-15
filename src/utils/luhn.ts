export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and non-digit characters from the card number
  const cleanCardNumber = cardNumber.replace(/\D/g, "");

  // Check if the card number has the correct length and is composed of digits only
  if (
    cleanCardNumber.length < 13 ||
    cleanCardNumber.length > 16 ||
    isNaN(Number(cleanCardNumber))
  ) {
    return false;
  }

  // Calculate the Luhn checksum
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
