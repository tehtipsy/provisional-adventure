import { useState } from "react";
import Button from "@/components/ui/button";

type AttackOptionsProps = {
  options: string[];
  onOptionSelection: (option: string) => void;
};

export default function AttackOptions({
  options,
  onOptionSelection,
}: AttackOptionsProps) {
  return (
    <>
      <ul>
        {options.map((option) => {
          return (
            <>
              <li key={option}>
                <Button onClick={() => onOptionSelection(option)}>
                  {option}
                </Button>
              </li>
              <br />
            </>
          );
        })}
      </ul>
    </>
  );
}
