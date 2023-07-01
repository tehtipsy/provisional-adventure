import { GlobalContext } from "@/contexts/globalContext";
import { useContext, useState } from "react";

export const MyUserComponent = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState("");

  const handleUsernameChange = (event: { target: { value: any } }) => {
    setCurrentUser(event.target.value);
  };

  const handleButtonClick = () => {
    setUser(currentUser);
  };

  return (
    <div>
      <input type="text" onChange={handleUsernameChange} />
      <p>Entered username: {currentUser}</p>
      <button onClick={handleButtonClick}>Save Username</button>
    </div>
  );
};
