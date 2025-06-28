import { FC, useRef } from "react";
import Carousel from "react-multi-carousel";
import Product from "@/components/shared/Product";
import { IProduct } from "@/interface/IProduct";
import "react-multi-carousel/lib/styles.css";
import { MoveLeft, MoveRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  products: IProduct[];
  showSliderArrows?: boolean;
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
    partialVisibilityGutter: 30,
  },
};

const Marketplace: FC<Props> = ({
  title,
  subtitle,
  description,
  products,
  showSliderArrows = false,
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
      </div>

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
        {products.map(
          ({ id, author, image, name, photo, price, rating, wants }) => (
            <Product
              key={id}
              name={name}
              author={author}
              image={image}
              photo={photo}
              price={price}
              rating={rating}
              wants={wants}
            />
          )
        )}
      </Carousel>
    </div>
  );
};

export default Marketplace;
