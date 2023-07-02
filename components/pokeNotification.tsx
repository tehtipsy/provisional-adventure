import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

type PokeNotificationProps = {
  sender: string;
};

export function PokeNotification({ sender }: PokeNotificationProps) {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription> {sender} Poked You </AlertDescription>
    </Alert>
  );
}
