export function formatNairaPrice(price: number): string {
  if (isNaN(price)) {
    throw new Error("Invalid price value");
  }

  const priceStr = price.toString();
  const [wholePart, decimalPart] = priceStr.includes(".")
    ? priceStr.split(".")
    : [priceStr, "00"];

  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedPrice = `${formattedWholePart}.${decimalPart}`;

  return `₦${formattedPrice}`;
}

// Example usage
const priceInNaira = 1234567.89;
const formattedPrice = formatNairaPrice(priceInNaira);
console.log(formattedPrice); // Output: "₦1,234,567.89"
