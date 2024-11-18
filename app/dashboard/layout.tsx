import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DashboardNav } from "@/components/dashboard-nav";
import { User } from "next-auth";

// Create a fake user object
const fakeUser: User = {
  id: "111",
  name: "John Doe",
  email: "john.doe@example.com",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" // Using DiceBear for a placeholder avatar
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signin");
  // }

  return (
    <div className="flex min-h-screen">
      {/* <DashboardNav user={session.user} /> */}
      <DashboardNav user={fakeUser}/>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}