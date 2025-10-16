import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductOverview: React.FC = () => {
  const productTabList = [
    {
      title: "Item Description",
      value: "item-description",
    },
    {
      title: "Details",
      value: "details",
    },
    {
      title: "Swap Guideline",
      value: "swap-guideline",
    },
  ];
  const exchangeList = [
    {
      description: "Power Bank (20,000+ mAh)",
    },
    {
      description: "Smart Watch (Apple or Samsung)",
    },
    {
      description: "Airpod (Oraimo or JBL)",
    },
  ];
  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
        PRODUCT OVERVIEW
      </h6>
      <div className="flex gap-6">
        <Card className="w-[60%] overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full h-[418px] relative bg-[url('https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center bg-no-repeat"></div>
            <div className="p-4">
              <Tabs
                defaultValue="item-description"
                className="w-full !rounded-[26px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  {productTabList.map((_, index) => (
                    <TabsTrigger
                      value={_.value}
                      className={`rounded-[26px]`}
                      key={index}
                    >
                      {_.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="item-description">
                  <p className="text-sm text-[#737373]">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure
                  </p>
                </TabsContent>
                <TabsContent value="details" className="grid grid-cols-3 gap-2">
                  <p className="text-sm text-[#737373]">Condition</p>
                  <p className="text-sm text-[#737373]">Category</p>
                  <p className="text-sm text-[#737373]">Date Listed</p>

                  <p className="rounded-2xl text-xs text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium text-[#222222] border border-[#E2FFE3] bg-[#F0FFF6]">
                    Excellent
                  </p>
                  <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium text-[#222222] border border-[#E9E9E9] bg-white">
                    Fashion
                  </p>
                  <p className="text-xs font-medium text-[#222222]">
                    April 10, 2025
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <div className="w-[40%]">
          <Card className="mb-4 2xl:mb-6">
            <CardContent className="p-4 2xl:p-6">
              <h5 className="text-[#000000] font-medium mb-2 text-2xl">
                Gently used Nike shoe
              </h5>
              <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
                $75,000 Est.
              </h6>
              <div className="bg-[#F7F7F7] py-3 px-4">
                <h6 className="text-xl mb-4 2xl:mb-6">Requested in Exchange</h6>
                <ul className="flex flex-col gap-2">
                  {exchangeList.map((des, index) => (
                    <li
                      className="flex gap-2 items-center text-[#737373] text-sm"
                      key={index}
                    >
                      <span className="w-5 h-5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
                        ?
                      </span>
                      {des.description}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <h6 className="text-xl mb-3 font-medium">About the Swapper</h6>
          <Card className="mb-4 2xl:mb-6">
            <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
              <Image
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
                height={40}
                width={40}
                alt=""
              />
              <div className="me-auto">
                <p className="text-[#222222] font-medium text-base">
                  Shola Adeyemi
                </p>
                <div className="flex gap-2 text-[#737373] text-sm items-center">
                  <p className="flex items-center gap-1">
                    3.5 <Rating />
                  </p>
                  <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
                  <p>27 swaps</p>
                </div>
              </div>
              <Link href="/profile/1">
                <div className="border border-[#E9E9E9] rounded-[6px] gap-1 p-[6px] flex items-center">
                  <p className="font-medium text-xs text-[#222222]">
                    View profile
                  </p>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
                    <ArrowRight size={12} color="#fff" />
                  </span>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-[#F0FFF6]">
            <CardContent className="py-3 xp-4 2xl:p-6">
              <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">
                Ready to negotiate?
              </h6>
              <p className="text-[#737373] text-sm mb-3">
                Start a conversation with Shola Adeyemi to discuss swap details.
              </p>
              <Button
                variant={"default"}
                className="rounded-full font-medium text-sm py-3 w-full"
                size={"lg"}
                asChild
              >
                <Link href="/chat">Negotiate</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
