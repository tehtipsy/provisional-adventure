import { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectSizeFormProps = { setSizeSelection: (e: FormEvent) => void };

export function SelectSizeForm({ setSizeSelection }: SelectSizeFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSizeSelection(e);
  };

  return (
    <div
      onChange={handleSubmit}
      className="w-auto flex justify-center m-6 p-6 space-y-6 rounded"
    >
      <Select>
        <SelectTrigger className="p-2 rounded border border-black dark:border-gray-700">
          <SelectValue placeholder="Select Race Size Category" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 w-auto p-2 rounded border border-black dark:border-gray-700">
          <SelectItem value="1">{"Small"}</SelectItem>
          <SelectItem value="2">{"Medium"}</SelectItem>
          <SelectItem value="3">{"Large"}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
