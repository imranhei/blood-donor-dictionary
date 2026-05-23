export function isDonorAvailable(lastDonate?: string) {
  if (!lastDonate) {
    return true;
  }

  const lastDonationDate = new Date(lastDonate);
  const today = new Date();

  const diffTime = today.getTime() - lastDonationDate.getTime();

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays >= 90;
}