import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { FC, useState } from "react";
import { IProduct } from "@/interface/IProduct";
import LoginRequiredModal from "@/components/shared/login-required-modal";

type Props = Prettify<Omit<IProduct, "id">> & {
  isAuthenticated?: boolean;
};

const Product: FC<Props> = (props) => {
  const {
    image,
    photo,
    price,
    rating,
    wants,
    author,
    name,
    isAuthenticated = true,
  } = props;
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSwap = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    router.push("/product/1");
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push("/login");
  };
  const handleSignup = () => {
    setShowLoginModal(false);
    router.push("/signup");
  };

  return (
    <div className="rounded-xl w-fit hover:border hover:border-[#e3e0e0] cursor-pointer p-2">
      <div className="relative">
        <Image
          src={image}
          width={350}
          alt="Product Preview"
          objectFit="cover"
          className="rounded-xl h-[350px]"
        />
        <div className="bg-white absolute top-3 right-3 rounded-full p-1">
          <Heart size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">{name}</p>
          <p className="text-[#007AFF] font-medium text-sm">{price}</p>
        </div>
        <p className="text-[#737373] font-normal text-[13px]">
          <span className="text-[#222222] font-medium text-[13px]">Wants:</span>{" "}
          {wants}
        </p>
      </div>

      <div className="flex items-center justify-between border border-[#e3e0e0] px-2 py-2 rounded-xl">
        <div className="flex items-center gap-1">
          <Image
            src={photo}
            alt="user photo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-[#222222] font-medium text-[14px]">{author}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[#222222] font-normal text-[15px]">{rating}</p>
          <Rating />
        </div>
      </div>
      <Button className="w-full rounded-full mt-4 mb-2" onClick={handleSwap}>
        Swap Now
      </Button>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        title="Login Required to Swap"
        description="You need to be logged in to swap items. Please sign in to continue with your swap and start trading!"
        actionText="Go to Login"
      />
    </div>
  );
};

export default Product;
