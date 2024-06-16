import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import CreateListing from "@/components/createListing";
import { cookies } from 'next/headers';

export default async function UserProfilePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
    return null;
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (!user) {
    redirect("/");
    return null;
  }

  return <CreateListing user={user} />;
}