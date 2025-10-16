import { FC, useRef } from "react";
import Carousel from "react-multi-carousel";
import Product from "@/components/shared/Product";
import { IProduct } from "@/interface/IProduct";
import "react-multi-carousel/lib/styles.css";
import { MoveLeft, MoveRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/shared/empty-state";

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
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter:  30,
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

  return (
    <div className="relative">
      <div className="flex items-end justify-between mb-4 w-[95%]">
        <div className="flex flex-col gap-2">
          <p className="text-[#007AFF] text-[15px] font-medium">{title}</p>
          <h3 className="text-[#222222] font-medium text-5xl">{subtitle}</h3>
          <p className="text-[#737373] font-normal text-2xl">{description}</p>
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
              <p className="text-[#007AFF] font-medium text-[15px] cursor-pointer">
                View all
              </p>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <Carousel
          arrows={false}
          partialVisible={true}
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-xl w-fit p-2">
              <div className="relative">
                <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                <div className="bg-white absolute top-3 right-3 rounded-full p-1">
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2 mb-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between border border-[#e3e0e0] px-2 py-2 rounded-xl">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-full mt-4 mb-2" />
            </div>
          ))}
        </Carousel>
      ) : !isLoading && (!products || products.length === 0) ? (
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          showActionButton={showEmptyStateAction}
          actionButtonText={emptyStateActionText}
          onActionClick={onEmptyStateAction}
        />
      ) : (
        <Carousel
          ref={carouselRef}
          arrows={false}
          partialVisible={true}
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((product) => (
              <Product
                key={product.listingId || product.id}
                {...product}
                isAuthenticated={isAuthenticated}
              />
            )
          )}
        </Carousel>
      )}
    </div>
  );
};

export default Marketplace;
