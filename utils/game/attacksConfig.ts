// call from client and set in poke
export const fetchAttackObject = async (damageType: string, bodyPart: string) => {
  const params = new URLSearchParams({
    damageType: damageType,
    bodyPart: bodyPart,
  });
  const response = await fetch(`http://0.0.0.0:3000/api/db/wounds?${params}`);
  const attackConfig = await response.json();
  console.log("fetchAttackObject: ", attackConfig);
  return attackConfig;
};
