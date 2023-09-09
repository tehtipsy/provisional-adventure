export default function createDefaultAttributes<T extends object>({
  attributeType,
}: {
  attributeType: T;
}): T {
  return Object.fromEntries(
    Object.keys(attributeType).map((key) => [key, 0])
  ) as T;
}
