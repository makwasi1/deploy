export function truncateAddress(address: string, startCountLetters: number = 9, endCountLetters: number = 9) {
  const truncatedAddress =
    address.substring(0, startCountLetters) + "..." + address.substring(address.length - endCountLetters);
  return truncatedAddress;
}



export function truncateLovelaces(num: number): any {
  const numString = num.toString();
  const length = numString.length;
  
  if (length <= 6) {
    return numString;
  }
  
  const firstPart = parseInt(numString.substring(0, length - 6));
  const secondPart = parseInt(numString.substring(length - 6));
  
  return `${firstPart}.${secondPart}`;
}
