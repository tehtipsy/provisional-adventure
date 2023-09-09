type UpdateProps = {
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
  weapon: string;
  damageType: string;
  tier: number;
  bodyPart: string;
  actionPoints: number;
};
