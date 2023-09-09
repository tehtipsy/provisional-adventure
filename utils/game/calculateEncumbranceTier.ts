interface EncumbranceTierProps {
  totalWeight: number;
  prowess: number;
};

export default function calculateEncumbranceTier({
  totalWeight,
  prowess,
}: EncumbranceTierProps): number {
  let encumbranceTier = 0;
  if (prowess !== 0) {
    encumbranceTier = Math.min(
      Math.max(Math.floor((totalWeight - 1) / prowess) + 1, 0),
      4
    );
  }
  return encumbranceTier;
}
