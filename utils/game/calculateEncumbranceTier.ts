export default function calculateEncumbranceTier(
  totalWeight: number,
  prowess: number
) {
  let encumbranceTier = 0;
  if (prowess !== 0) {
    encumbranceTier = Math.min(
      Math.max(Math.floor((totalWeight - 1) / prowess) + 1, 0),
      4
    );
  }
  return encumbranceTier;
}
