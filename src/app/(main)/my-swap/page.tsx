import Swap from "@/app/(main)/my-swap/_components";
import Footer from "@/components/shared/footer";

export default function MySwapPage() {
  return (
    <>
      <div className="w-[95%] mx-auto my-20 md:my-10">
        <Swap />
      </div>
      <Footer />
    </>
  );
}
