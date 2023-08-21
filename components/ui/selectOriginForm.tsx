import { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectSizeFormProps = { setOriginSelection: (e: FormEvent) => void };

export function SelectOriginForm({
  setOriginSelection: setOriginSelection,
}: SelectSizeFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOriginSelection(e);
  };

  return (
    <div
      onChange={handleSubmit}
      className="w-auto flex justify-center m-6 p-6 space-y-6 rounded"
    >
      <Select>
        <SelectTrigger className="p-2 rounded border border-black dark:border-gray-700">
          <SelectValue placeholder="Select Origin" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 w-auto p-2 rounded border border-black dark:border-gray-700">
          <SelectItem value="Commonfolk">{"Commonfolk"}</SelectItem>
          <SelectItem value="Mycelian">{"Mycelian"}</SelectItem>
          <SelectItem value="Lillyput">{"Lillyput"}</SelectItem>
          <SelectItem value="Highlander">{"Highlander"}</SelectItem>
          <SelectItem value="Inquisitor">{"Inquisitor"}</SelectItem>
          <SelectItem value="Purifier">{"Purifier"}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
