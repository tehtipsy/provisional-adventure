import { useContext } from "react";
import { CharacterContext } from "@/contexts/characterContext";

export const SheetEffects: React.FC = (): JSX.Element => {
  const { statusEffects } = useContext(CharacterContext);
  if (statusEffects) {
    return (
      <div>
        <p>{"Effects:"}</p>
        <ul>
          {Object.keys(statusEffects).map((effectKey) => (
            <li key={effectKey}>
              {statusEffects[effectKey]} * {effectKey}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>{"No Status Effects Loaded in CharacterContext"}</div>;
  }
};

export default SheetEffects;
