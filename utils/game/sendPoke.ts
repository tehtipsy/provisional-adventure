import { ActionResolverProps } from "@/utils//props/ActionResolverProps";

interface pokeProps {
  timestamp: string;
  channel: any;
  totalActionPoints: number;
  resolverPayload: ActionResolverProps;
}

export const sendPoke = (props: pokeProps) => {
  const data = props.resolverPayload;
  props.channel.publish("poke", {
    data,
  });
  const newTotal = props.totalActionPoints - props.resolverPayload.actionPoints;
  return newTotal
};
