import Link from "next/link";

export default function Index() {
  return (
    <div className="flex my-6 justify-center">
      <div className="bg-blue-900 px-6 py-2 rounded">
        <Link href="/boilerplate">Go to boilerplate</Link>
      </div>
    </div>
  );
}
