export function truncateAddress(address: string, startCountLetters: number = 9, endCountLetters: number = 9) {
  const truncatedAddress =
    address.substring(0, startCountLetters) + "..." + address.substring(address.length - endCountLetters);
  return truncatedAddress;
}
