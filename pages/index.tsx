import BasePage from "@/components/base/basePage";
import Button from "@/components/ui/button";
import { UserForm } from "@/components/userForm";
import { GlobalContext } from "@/contexts/globalContext";
import { useContext } from "react";

export default function Index() {
  const { user, setUser } = useContext(GlobalContext);
  return (
    <BasePage>
      <UserForm />
    </BasePage>
  );
}
