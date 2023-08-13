import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AttackConfigNotificationProps = {
  damageOptions: string[];
  onAttackSelection: (attack: string) => void;
};

export function AttackConfigNotification({
  damageOptions,
  onAttackSelection,
}: AttackConfigNotificationProps) {
  console.log("Damage Options", damageOptions);
  return (
    <Alert>
      <AlertTitle>Choose An Attack Type:</AlertTitle>
      <AlertDescription>
        {damageOptions.map((option) => (
          <button key={option}
          onClick={() => onAttackSelection(option)}
          >
            {option}
          </button>
        ))}
      </AlertDescription>
    </Alert>
  );
}
