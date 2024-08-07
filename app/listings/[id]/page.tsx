import { redirect } from "next/navigation";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";
import ProductListing from "@/models/ProductListing";
import ProductListingPage from "@/components/productListing";
import { getServerSession } from "next-auth";

const ListingPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
const session = await getServerSession();
if (!session) {
  redirect("/login");
  return null;
}

await dbConnect();
const user = await User.findOne({ email: session.user?.email });

if (!user) {
  redirect("/login");
  return null;
}
  const Listing = await ProductListing.findOne({ _id: id });
  if (!Listing) {
    redirect("/");
    return null;
  }
  return (
    <ProductListingPage listing={Listing} sessionuser={user.username} />
  );
};

export default ListingPage;


