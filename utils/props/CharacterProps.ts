export type AttributeProps = {
  unmodifiedValue: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  bonus: number;
};

export type AttributesProps = {
  [key: string]: AttributeProps;
};

export type ItemProps = {
  [index: string]: string | number | string[];
  name: string;
  quantity: number;
  damageRating: number;
  damageType: string[];
};

export type EquipmentProps = {
  [key: string]: ItemProps;
};

export type StatusEffectProps = {
  [index: string]: string | number;
  name: string;
  quantity: number;
};

export type StatusEffectsProps = {
  [key: string]: StatusEffectProps;
};

export type CharacterSheetProps = {
  characterName: string;
  characterSize: number;
  characterOrigin: string;
  actionPoints: number;
  characterEncumbrance: number;
  attributes: AttributesProps;
  equipment: EquipmentProps;
  statusEffects: StatusEffectsProps;
};

export type CharacterProps = {
  characterSheet: CharacterSheetProps;
};
