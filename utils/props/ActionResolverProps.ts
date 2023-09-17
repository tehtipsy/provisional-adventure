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
