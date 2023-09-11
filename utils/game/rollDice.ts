export default function rollDice(numDice: number) {
  let count = 0;
  // let rolls = []
  for (let i = 0; i < numDice; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    // rolls.push(roll);
    if (roll === 5 || roll === 6) {
      count++;
    }
  }
  return count;
  // return [count, rolls];
}
