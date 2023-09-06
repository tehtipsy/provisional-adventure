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
      //     ...(Object.keys(userInput.selectedItems.hands).length === 0
            // ?
          // {
                quantity: 2,
                damageRating: 1,
                damageType: ["Bludgeoning", "Slapping"],
                name: "Fist of Fury",
              // }
      //       : userInput.selectedItems.hands),
        },

      //   belt: {
      //     ...userInput.selectedItems.belt,
      //   },
      //   quiver: {
      //     ...userInput.selectedItems.quiver,
      //   },
      //   backpack: {
      //     ...userInput.selectedItems.backpack,
      //   },
      //   armor: {
      //     head: {
      //       ...userInput.selectedItems.head,
      //     },
      //     chest: {
      //       ...userInput.selectedItems.chest,
      //     },
      //     torso: {
      //       ...userInput.selectedItems.torso,
      //     },
      //     gloves: {
      //       ...userInput.selectedItems.gloves,
      //     },
      //   },
      },
      // statusEffects: {
      //   ...userInput.selectedItems.statusEffects,
      // },
    };

  return newSheet;
};
