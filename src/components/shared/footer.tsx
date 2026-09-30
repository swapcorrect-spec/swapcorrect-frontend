"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black p-5 md:p-10 mt-20">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h6 className="text-white font-medium text-base">ABOUT SWAP CORRECT</h6>
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

            <Link
              href="https://blog.swapcorrect.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Our Blog
            </Link>
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div>
          <h6 className="text-white font-medium text-base">BUYING ON SWAP CORRECT</h6>
          <div className="flex flex-col gap-2 my-4">
            <Link
              href="/swap-safety-centre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Swap Safety Centre
            </Link>
            <Link
              href="/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              FAQs
            </Link>
          </div>
        </div>

        <div>
          <h6 className="text-white font-medium text-base">MORE INFO</h6>
          <div className="flex flex-col gap-2 my-4">
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              href="/authentic-item-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Authentic Items Policy
            </Link>
            <Link
              href="/risk-assessment-register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-extralight hover:underline"
            >
              Risk Assessment Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
