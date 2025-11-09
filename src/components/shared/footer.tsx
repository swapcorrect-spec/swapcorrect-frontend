"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black p-5 md:p-10 mt-20">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h6 className="text-white font-medium text-base">ABOUT SWAP SHOP</h6>
          <div className="flex flex-col gap-2 my-4">
            <Link
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Contact Us
            </Link>
            <p className="text-white text-sm font-extralight">Our Blog</p>
            <p className="text-white text-sm font-extralight">Terms & Conditions</p>
          </div>
        </div>

        <div>
          <h6 className="text-white font-medium text-base">BUYING ON SWAP SHOP</h6>
          <div className="flex flex-col gap-2 my-4">
            <p className="text-white text-sm font-extralight">Buyer Safety Centre</p>
            <p className="text-white text-sm font-extralight">FAQs</p>
            <p className="text-white text-sm font-extralight">Our Blog</p>
            <p className="text-white text-sm font-extralight">Terms & Conditions</p>
          </div>
        </div>

        <div>
          <h6 className="text-white font-medium text-base">MORE INFO</h6>
          <div className="flex flex-col gap-2 my-4">
            <p className="text-white text-sm font-extralight">Privacy Policy</p>
            <p className="text-white text-sm font-extralight">Authentic Items Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
