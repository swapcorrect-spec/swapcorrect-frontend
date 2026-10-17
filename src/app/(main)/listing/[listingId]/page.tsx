"use client";

import ListingOverview from "@/app/(main)/listing/[listingId]/components";

interface ProductPageProps {
  params: {
    listingId: string;
  };
}

export default function Listing({ params }: ProductPageProps) {
  return (
    <div className="mt-20 md:mt-0">
      <ListingOverview listingId={params.listingId} />
    </div>
  );
}
