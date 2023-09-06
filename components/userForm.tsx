import { FormEvent, useContext, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export const UserForm = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState("");

  const handleUsernameChange = (event: { target: { value: any } }) => {
    setCurrentUser(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser(currentUser);
  };

  return user ? (
    <div className="text-2xl m-6 text-center">Welcome {user}</div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
    >
      <Input onChange={handleUsernameChange} placeholder="Enter username" />
      <Button type="submit">{"Save Username"}</Button>
    </form>
  );
};
