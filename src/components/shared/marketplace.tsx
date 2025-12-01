import { FC, useRef } from "react";
import Carousel from "react-multi-carousel";
import Product from "@/components/shared/Product";
import { IProduct } from "@/interface/IProduct";
import "react-multi-carousel/lib/styles.css";
import { MoveLeft, MoveRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/shared/empty-state";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  products: IProduct[];
  showSliderArrows?: boolean;
  isLoading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  showEmptyStateAction?: boolean;
  emptyStateActionText?: string;
  onEmptyStateAction?: () => void;
  isAuthenticated?: boolean;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const Marketplace: FC<Props> = ({
  title,
  subtitle,
  description,
  products,
  showSliderArrows = false,
  isLoading = false,
  emptyStateTitle = "No items found",
  emptyStateDescription = "Check back later for new items or try refreshing the page.",
  showEmptyStateAction = false,
  emptyStateActionText = "Browse All Items",
  onEmptyStateAction,
  isAuthenticated = true,
}) => {
  const carouselRef = useRef<Carousel | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative my-4">
      <div className="flex items-end justify-between mb-4 w-[100%]">
        <div className="flex flex-col gap-1 w-[70%]">
          <p className="text-[#007AFF] text-[15px] font-medium">{title}</p>
          <h3 className="text-[#222222] font-medium text-base md:text-5xl">{subtitle}</h3>
          <p className="text-[#737373] font-medium text-[12px] md:text-2xl">{description}</p>
        </div>
        {!isLoading && products && products.length > 0 && (
          <div className="flex items-center gap-4">
            {showSliderArrows ? (
              <div className="flex gap-5">
                <button onClick={() => carouselRef.current?.previous(1)}>
                  <MoveLeft />
                </button>
                <button onClick={() => carouselRef.current?.next(1)}>
                  <MoveRight />
                </button>
              </div>
            ) : (
              <Link href={PATHS.CATEGORY}>
                <p className="text-[#007AFF] font-medium text-[15px] cursor-pointer underline">View all</p>
              </Link>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          {[...Array(isMobile ? 2 : 4)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 p-3 bg-white shadow-sm flex flex-col justify-between"
            >
              {/* Image skeleton */}
              <div className="relative">
                <Skeleton className="h-[180px] w-full rounded-lg" />
                <div className="bg-white absolute top-2 right-2 rounded-full p-1 shadow">
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2 mt-3 mb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Bottom actions */}
              <div className="flex items-center justify-between border border-[#e5e5e5] px-2 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-6" />
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-8 w-full rounded-full mt-3" />
            </div>
          ))}
        </div>
      ) : !isLoading && (!products || products.length === 0) ? (
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          showActionButton={showEmptyStateAction}
          actionButtonText={emptyStateActionText}
          onActionClick={onEmptyStateAction}
        />
      ) : isMobile ? (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Product key={product.listingId || product.id} {...product} isAuthenticated={isAuthenticated} />
          ))}
        </div>
      ) : (
        <Carousel
          ref={carouselRef}
          arrows={false}
          partialVisible
          swipeable
          draggable
          showDots={false}
          responsive={responsive}
          ssr
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
        >
          {products.map((product) => (
            <div key={product.listingId || product.id} className="p-2">
              <Product {...product} isAuthenticated={isAuthenticated} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Marketplace;
