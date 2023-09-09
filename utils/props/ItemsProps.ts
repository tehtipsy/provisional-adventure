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