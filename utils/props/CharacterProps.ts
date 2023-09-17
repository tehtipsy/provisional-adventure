import useCharacterState from "@/utils/game/useCharacterState";

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

export type StatusEffectsProps = { // WRONG
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
  statusEffects: StatusEffectProps;
};

export type CharacterProps = {
  characterSheet: CharacterSheetProps;
};

export interface AttributesTotalsProps {
  [key: string]: number;
}

export type CharacterState = ReturnType<typeof useCharacterState>;

export type CharacterContextProps = CharacterState;
