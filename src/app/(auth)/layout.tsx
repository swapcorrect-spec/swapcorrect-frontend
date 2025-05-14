"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const progressCircle = useRef<SVGCircleElement | null>(null);
  const progressContent: any = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div className="">
      <div className="flex flex-col md:w-[90%] md:flex-row md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:gap-8 items-center md:justify-between">
        <div className="hidden md:block w-[50%]">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/Banner_one.png)] rounded-[30px]  bg-contain bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[80%]">
                    Turn Your Items Into Instant Value!
                  </h2>
                  <p className="text-white font-normal text-lg leading-tight w-[100%] pt-4">
                    No be only buy and sell — swap your way to something better.
                    List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/Banner_three.png)] rounded-[30px]  bg-contain bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[80%]">
                    Swap. Shop. Shine!
                  </h2>
                  <p className="text-white font-normal text-lg leading-tight w-[100%] pt-4">
                    No be only buy and sell — swap your way to something better.
                    List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative bg-[url(../app/assets/images/Banner_two.png)] rounded-[30px]  bg-contain bg-no-repeat h-[90vh]">
                <div className="absolute bottom-14 w-[80%] px-8">
                  <h2 className="text-white text-[40px] font-bold leading-none w-[76%]">
                    Join The Elite Team of Swappers
                  </h2>
                  <p className="text-white font-normal text-lg leading-tight w-[100%] pt-4">
                    {" "}
                    No be only buy and sell — swap your way to something better.
                    List now, trade smart.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-[90%] md:w-[50%]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
