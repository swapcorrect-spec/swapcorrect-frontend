"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ItemSliderContent from "@/components/widget/item-slider";
import Link from "next/link";

const MarketPlace: React.FC = () => {
  return (
    <>
      <div className="mb-20">
        <p className="text-[#007AFF] font-medium text-sm mb-3">FEATURED</p>
        <h2 className="text-[#222222] mb-3 text-[2.5rem]">
          Hot Picks, Fast Swaps.
        </h2>
        <div className="flex items-center justify-between mb-10">
          <p className="text-[#737373] text-xl">
            Discover trending items that everyone wants — swap quick{" "}
          </p>
          <Link
            href="#"
            className="text-[#007AFF] font-medium text-sm no-underline"
          >
            View all
          </Link>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={false}
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="max-w-[388px] flex-shrink-0">
              <ItemSliderContent
                imgUrl={
                  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-20">
        <p className="text-[#007AFF] font-medium text-sm mb-3">FEATURED</p>
        <h2 className="text-[#222222] mb-3 text-xl text-[2.5rem]">
          Swaps Just for You.
        </h2>

        <div className="flex items-center justify-between mb-10">
          <p className="text-[#737373] text-xl">
            Our spotlight trades are secure, high-value, and worth every click.
          </p>
          <Link
            href="#"
            className="text-[#007AFF] font-medium text-sm no-underline"
          >
            View all
          </Link>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={false}
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="max-w-[388px] flex-shrink-0">
              <ItemSliderContent
                imgUrl={
                  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <p className="text-[#007AFF] font-medium text-sm mb-3">
          OUR RECOMMENDATION
        </p>
        <h2 className="text-[#222222] mb-3 text-xl text-[2.5rem]">
          Advanced Tech Gadgets
        </h2>

        <div className="flex items-center justify-between mb-10">
          <p className="text-[#737373] text-xl">
            Our spotlight trades are secure, high-value, and worth every click.{" "}
          </p>
          <Link
            href="#"
            className="text-[#007AFF] font-medium text-sm no-underline"
          >
            View all
          </Link>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={false}
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index} className="max-w-[388px] flex-shrink-0">
              <ItemSliderContent
                imgUrl={
                  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MarketPlace;
