import { UserButton } from "@clerk/nextjs";
// page initial
export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
