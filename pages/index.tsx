import BasePage from "@/components/base/basePage";
import { MyUserComponent } from "@/components/base/myUser";
import Link from "next/link";

export default function Index() {
  return (
    <BasePage>
    <MyUserComponent />
      <div className="flex my-6 justify-center">
        <div className="bg-blue-900 px-6 py-2 rounded">
          <h3 className="text-white">This is not a button</h3>
        </div>
      </div>
    </BasePage>
  );
}
