export type ItemProps = {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
};

export type ItemsProps = {
  [key: string]: Array<ItemProps>;
};

export type ItemsTotalProps = {
  buttonValue: string;
  items: Record<string, Array<ItemProps>>;
  selectedStatus: Record<string, boolean>;
  budget: number;
  setBudget: (value: number) => void;
  capacity: number;
  setCapacity: (value: number) => void;
};