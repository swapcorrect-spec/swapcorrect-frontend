"use client";

import ListingOverview from "@/app/(main)/listing/[listingId]/components";

interface ProductPageProps {
  params: {
    listingId: string;
  };
}

export default function Listing({ params }: ProductPageProps) {
  return (
    <>
      <ListingOverview listingId={params.listingId} />
    </>
  );
}
