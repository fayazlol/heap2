import ProductListing from "@/models/ProductListing";
import {Card,Button,Image,Link,CardFooter,CardBody,Divider} from "@nextui-org/react";
import { formatDate } from "@/app/lib/formatDate";
import LikeIcon from "@/app/lib/ToggleLikeButton";
import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user"
import Favourite from "@/models/favourite";
import mongoose from "mongoose";

interface ProductListing {
  _id: mongoose.Types.ObjectId;
  productImagePath: string;
  productName: string;
  productBrand: string;
  productSize: string;
  price: string;
  createdAt: Date; // or Date depending on how you are receiving this data
}

interface ProductListing {
  _id: mongoose.Types.ObjectId;
  productImagePath: string;
  productName: string;
  productBrand: string;
  productSize: string;
  price: string;
  createdAt: Date;
}

export const metadata = {
  title: "My Favourites",
  description: "View your favourite products",
};

const MyFavouritesPage = async () => {
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

  const favourites = await Favourite.find({ username: user.username });
  const productIds = favourites.map((favourite) => favourite.productId);
  const productListings = await ProductListing.find({
    _id: { $in: productIds },
  });

  return (
    <main className="bg-[#fafafa] min-h-screen"> 
      <h1 className="text-black text-2xl font-bold mb-4">My Favourites</h1>
      <div className='grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4'>
        {productListings.length > 0 ? (
          productListings.map((listing) => (
            <div
              key={listing._id.toString()}
            >
              <Card
    className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
    isHoverable
    isBlurred
  >
    <div className="absolute top-2 right-2 z-20">
    <LikeIcon productId={listing._id} username={user.username} />
    </div>
    <CardBody className="overflow-visible p-0">
    <Link href="/userprofile">
    <div className="w-full h-[300px]">
      <Image
        radius="lg"
        width="100%"
        height="100%"
        alt="shirt1"
        className="w-full object-cover h-[300px]"
        src={listing.productImagePath}
      />
      </div>
      </Link>
    </CardBody>
    <Link href="/userprofile">
    <CardFooter className="flex flex-col items-start">
        <div className="flex justify-center items-center">
        <b className="text-[#71717a] text-xs">Listed by {listing.username} {formatDate(listing.createdAt)}</b>
        </div>
        <Divider/>
      <div className="flex justify-between w-full">
        <b className="text-black text-xl">{listing.productName}</b>
        <b className="text-black text-xl">${listing.price}</b>
      </div>
      <div className="flex justify-between w-full">
      <b className="text-black text-l">{listing.productBrand}</b>
      <b className="text-black text-l">{listing.productSize}</b>
      </div>
    </CardFooter>
    </Link>
  </Card>
            </div>
          ))
        ) : (
          <p className="text-black justify-center items-center">No favourites found</p>
        )}
      </div>
    </main>
  );
};

export default MyFavouritesPage;