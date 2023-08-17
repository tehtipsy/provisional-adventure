import BasePage from "@/components/base/basePage";
import Button from "@/components/ui/button";
import { UserForm } from "@/components/userForm";
import { GlobalContext } from "@/contexts/globalContext";
import Link from "next/link";
import { useContext } from "react";

export default function Index() {
  const { user } = useContext(GlobalContext);
  return (
    <BasePage>
      <UserForm />
      {user ? (
        <>
          <div className="flex m-6 justify-center">
            <Link href="/game">
              <Button>Enter the game room</Button>
            </Link>
          </div>
          <div className="flex m-6 justify-center">
            <Link href="/manage-character">
              <Button>Manage Character Sheet</Button>
            </Link>
          </div>
        </>
      ) : null}
    </BasePage>
  );
}
