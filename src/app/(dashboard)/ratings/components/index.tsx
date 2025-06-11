"use client";

import { Card, CardContent } from "@/components/ui/card";
import RatingsEmptyState from "./ratings_empty";
import Reviews from "@/components/widget/review";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Ratings: React.FC = () => {
  const ratings = [
    { stars: 5, percent: 45 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 70 },
    { stars: 2, percent: 10 },
    { stars: 1, percent: 15 },
  ];

  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-3 text-xl">SAVED SWAPS</h6>
      <p className="text-xl font-medium text-[#222222] mb-8">
        All the items you&apos;ve marked to trade later
      </p>

      <RatingsEmptyState />
      <div className="max-w-[648px] w-full mt-5">
        <Card className="mb-6">
          <CardContent className="px-7 py-4 flex items-center justify-between gap-14">
            <div>
              <h1 className="#222222 font-medium text-[5rem] leading-none">
                4.8
              </h1>
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={28} />
                ))}
              </div>
              <p className="text-sm text-[#737373]">Based on 24 reviews</p>
            </div>
            <div className="flex-1 space-y-3">
              {ratings.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex gap-[2px] items-center">
                    <span className="text-sm text-[#737373]">{item.stars}</span>
                    <Star size={8} />
                  </div>
                  <div className="w-full">
                    <Progress value={item.percent} className="bg-[#D9D9D9]" />
                  </div>
                  <span className="text-xs text-[#222222] text-right">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
    </section>
  );
};

export default Ratings;
