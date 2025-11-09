"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Logo from "@/app/assets/images/svgs/logo_full.svg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const progressCircle = useRef<SVGCircleElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const progressContent: any = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div className="">
      <div className="relative w-[90%] mx-auto flex flex-col items-center md:flex-row gap-8 py-12">
        <div className="hidden md:block w-1/2">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper h-full"
          >
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/pngs/banner_one.png)] rounded-[30px] bg-cover bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[80%]">
                    Turn Your Items Into Instant Value!
                  </h2>
                  <p className="text-white font-normal text-lg leading-tight w-full pt-4">
                    No be only buy and sell — swap your way to something better. List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/pngs/banner_three.png)] rounded-[30px]  bg-cover bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[80%]">Swap. Shop. Shine!</h2>
                  <p className="text-white font-normal text-lg leading-tight w-[100%] pt-4">
                    No be only buy and sell — swap your way to something better. List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/pngs/banner_two.png)] rounded-[30px]  bg-cover bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[76%]">
                    Join The Elite Team of Swappers
                  </h2>
                  <p className="text-white font-normal text-lg leading-tight w-[100%] pt-4">
                    {" "}
                    No be only buy and sell — swap your way to something better. List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full md:w-1/2">
          <Link href={`${"/"}`} className="flex justify-center my-4">
            <Logo />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
