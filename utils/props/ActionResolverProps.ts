import useActionState from "../game/useActionState";

export type UpdateProps = {
  [key: string]: number;
};

export type UpdatesProps = {
  receiverUpdate: UpdateProps;
  senderUpdate: UpdateProps;
};

export type ActionResolverProps = {
  sender: string;
  receiver: string;
  action: string;
  item: string;
  damageType: string;
  tier: number;
  bodyPart: string;
  actionPoints: number;
};

export interface ActionMetaDataProps {
  timestamp: string;
  action?: string; // already in ActionResolverProps
  username?: string; // already in ActionResolverProps
  data?: ActionResolverProps;
}

export type ActionState = ReturnType<typeof useActionState>;

export type ActionContextProps = ActionState & {
  reciver: string | null;
  setReciver: React.Dispatch<React.SetStateAction<string | null>>;
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
};
