import { Star } from "lucide-react";
import Image from "next/image";

const Reviews: React.FC = () => {
  return (
    <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
      <div className="flex items-center gap-3 w-full mb-1">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F4CE9B] rounded-full">
          <Image
            src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
            height={32}
            width={32}
            alt="User profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="me-auto">
          <h5 className={`text-[#222222] text-sm font-medium`}>Mutiu Ganiyu</h5>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={12} />
          ))}
        </div>
      </div>
      <p className="text-sm text-[#222222] font-medium mb-1">
        Great swapper! Item was exactly as described and shipping was fast.
      </p>
      <p className="text-[#737373] text-xs">Yesterday</p>
    </div>
  );
};

export default Reviews;
