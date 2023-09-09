import { useEffect, useState } from "react";

export default function useSelectedStatus(initialStatus: any) {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const handleClickSelection = (buttonValue: string | number) => {
    setSelectedStatus((prevStatus: { [x: string]: any }) => ({
      ...prevStatus,
      [buttonValue]: !prevStatus[buttonValue],
    }));
  };

  return [selectedStatus, handleClickSelection];
}
