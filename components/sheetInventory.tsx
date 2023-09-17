import { useContext } from "react";
import { CharacterContext } from "@/contexts/characterContext";

export const SheetInventory: React.FC = (): JSX.Element => {
  const { handsSlot, weaponQuantity, weaponName, equipment } =
    useContext(CharacterContext);
  if (equipment) {
    return (
      <div>
        <p>{"Hands Slot:"}</p>
        {handsSlot ? (
          <p>
            {weaponQuantity}
            {" * "}
            {weaponName}
          </p>
        ) : (
          <p>{"Nothing in Hands"}</p>
        )}
        <p>{"Selected Equipment:"}</p>
        <ul>
          {Object.keys(equipment.selectedItems).map((index) => (
            <li key={index}>
              <p>{equipment.selectedItems[index]}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>{"No Character or Equipment Loaded in CharacterContext"}</div>;
  }
};

export default SheetInventory;