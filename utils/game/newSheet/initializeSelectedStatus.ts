interface Item {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
}

export default function initializeSelectedStatus(items: Record<string, Array<Item>>) {
  const initialSelectedStatus = {};

  Object.keys(items).forEach((key) => {
    const array = items[key];
    const obj = array.reduce((obj, item) => {
      obj[item.name] = false;
      return obj;
    }, {} as { [key: string]: boolean });
    Object.assign(initialSelectedStatus, obj);
  });

  return initialSelectedStatus;
}
