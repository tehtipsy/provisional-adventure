export const createNewSheet = (userInput: any) => {
  const newSheet = {
    user_id: {}, // user.id
    name: userInput.user,
    characterName: userInput.name,
    attributes: {
      prowess: {
        unmodifiedValue: parseInt(userInput.prowess),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
      finesse: {
        unmodifiedValue: parseInt(userInput.finesse),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
      constitution: {
        unmodifiedValue: parseInt(userInput.constitution),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
      focus: {
        unmodifiedValue: parseInt(userInput.focus),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
      willpower: {
        unmodifiedValue: parseInt(userInput.willpower),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
      motivation: {
        unmodifiedValue: parseInt(userInput.motivation),
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        bonus: 0,
      },
    },
    actionPoints: 0,
    equipment: {
      hands: {
        ...(Object.keys(userInput.selectedItems.equipment.hands).length === 0
          ? {
              quantity: 2,
              damageRating: 1,
              damageType: ["Bludgeoning", "Slapping"],
              name: "Fist of Fury",
            }
          : userInput.selectedItems.equipment.hands),
      },

      belt: {
        ...userInput.selectedItems.equipment.belt,
      },
      quiver: {
        ...userInput.selectedItems.equipment.quiver,
      },
      backpack: {
        ...userInput.selectedItems.equipment.backpack,
      },
      armor: {
        head: {
          ...userInput.selectedItems.equipment.head,
        },
        chest: {
          ...userInput.selectedItems.equipment.chest,
        },
        torso: {
          ...userInput.selectedItems.equipment.torso,
        },
        gloves: {
          ...userInput.selectedItems.equipment.gloves,
        },
      },
    },
    statusEffects: {
      ...userInput.selectedItems.statusEffects,
    },
  };
  
  return newSheet;
};
