import { Card, CardContent } from "@/components/ui/card";
import ProductDetails from "@/components/widget/product-details";
import ProfileDetailsHeader from "@/components/widget/profile-details";
import Reviews from "@/components/widget/review";

const UserProfile: React.FC = () => {
  return (
    <section className="flex gap-5 p-6">
      <div className="max-w-[404px] w-full flex flex-col gap-3 h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
        <ProfileDetailsHeader />
        <Card>
          <CardContent className="p-3">
            <p className="mb-4 font-medium text-base">Reviews</p>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Reviews key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
        <div className="font-medium flex text-[#222222] justify-between mb-5">
          <p>Items Available For Swap</p>
          <p className="text-xs">8 items</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductDetails
              imgUrl={
                "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
              }
              key={index}
              showHotpick={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
