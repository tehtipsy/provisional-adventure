import { ActionResolverProps } from "@/utils//props/ActionResolverProps";

interface pokeProps {
  timestamp: string;
  channel: any;
  totalActionPoints: number;
  resolverPayload: ActionResolverProps;
}

export const sendPoke = ({
  resolverPayload,
  channel,
  totalActionPoints,
}: pokeProps) => {
  const data = resolverPayload;
  channel.publish("poke", {
    data,
  });
  const newTotal = totalActionPoints - resolverPayload.actionPoints;
  return newTotal;
};
