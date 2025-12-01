"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useUpdateListing, useGetListingDetails, useGetAllCategories } from "@/app/_hooks/queries/listing/listing";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { SEARCH_ITEMS, LISTING_DETAILS } from "@/app/_constants/api_contant";

const ITEM_CONDITIONS = ["New", "Fairly Used", "Used", "Needs Repair"];
const CURRENCIES = [
  { code: "NGN", name: "Nigerian Naira (₦)" },
  { code: "USD", name: "US Dollar ($)" },
  { code: "GBP", name: "British Pound (£)" },
  { code: "EUR", name: "Euro (€)" },
  { code: "GHS", name: "Ghanaian Cedi (GH₵)" },
  { code: "KES", name: "Kenyan Shilling (KSh)" },
  { code: "ZAR", name: "South African Rand (R)" },
];

const EditItemListing = () => {
  const router = useRouter();
  const params = useParams();
  const listingId = params.listingId as string;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    listType: "Swap",
    itemName: "",
    estimatedCurrency: "NGN",
    estimatedAmount: 0,
    itemDescription: "",
    categoryId: "",
    itemCondition: "",
    location: "",
  });
  
  const [requestedItems, setRequestedItems] = useState<string[]>([""]);
  const [uploadedMedia, setUploadedMedia] = useState<{ mediaType: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data: listingData, isLoading, isError, error } = useGetListingDetails({
    enabler: !!listingId,
    listingId: listingId || "",
  });

  const { data: categoriesData } = useGetAllCategories({ enabler: true });
  const { updateListing, isPending } = useUpdateListing({
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: [SEARCH_ITEMS] });
      queryClient.invalidateQueries({ queryKey: [LISTING_DETAILS, listingId] });
      router.push('/item-listing');
    }
  });

  // Populate form when listing data loads
  useEffect(() => {
    if (listingData?.result && categoriesData) {
      const data = listingData.result;
      
      // Map categoryName to categoryId
      const category = categoriesData.find((cat: any) => cat.categoryName === data.categoryName);
      const mappedCategoryId = category?.id || "";

      setFormData({
        listType: data.listType || "Swap",
        itemName: data.itemName || "",
        estimatedCurrency: data.estimatedCurrency || "NGN",
        estimatedAmount: data.estimatedAmount || 0,
        itemDescription: data.itemDescription || "",
        categoryId: mappedCategoryId,
        itemCondition: data.itemCondition || "",
        location: "", // Not in response, user will need to fill
      });

      // Set requested items
      if (data.swapListRequest && data.swapListRequest.length > 0) {
        setRequestedItems(data.swapListRequest);
      } else {
        setRequestedItems([""]);
      }

      // Set media
      if (data.media && data.media.length > 0) {
        const firstMedia = data.media[0];
        setUploadedMedia({
          url: firstMedia.url,
          mediaType: firstMedia.mediaType === "Video" ? "Video" : "Image"
        });
      }
    }
  }, [listingData, categoriesData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestedItemChange = (index: number, value: string) => {
    const newItems = [...requestedItems];
    newItems[index] = value;
    setRequestedItems(newItems);
  };

  const addRequestedItem = () => {
    if (requestedItems.length < 3) {
      setRequestedItems([...requestedItems, ""]);
    }
  };

  const removeRequestedItem = (index: number) => {
    setRequestedItems(requestedItems.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary configuration missing!");
      return null;
    }

    let resourceType = "auto";
    if (file.type.startsWith("image/")) {
      resourceType = "image";
    } else if (file.type.startsWith("video/")) {
      resourceType = "video";
    } else {
      resourceType = "raw";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "swap_shop/listings");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return {
        url: data.secure_url,
        mediaType: file.type.startsWith("image/") ? "Image" : file.type.startsWith("video/") ? "Video" : "File"
      };
    } catch (error) {
      console.error("Error uploading:", error);
      return null;
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    
    const result = await uploadToCloudinary(file);
    if (result) {
      setUploadedMedia(result);
    }
    
    setIsUploading(false);
    if (e.target) e.target.value = "";
  };

  const removeMedia = () => {
    setUploadedMedia(null);
  };

  const handleSubmit = () => {
    if (!formData.itemName || !formData.categoryId || !formData.itemCondition || !formData.location) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!uploadedMedia) {
      toast.error("Please upload at least one media file!");
      return;
    }

    const payload = {
      ...formData,
      listId: listingId,
      listMediaFiles: [uploadedMedia],
      listingSwapReq: requestedItems.filter(item => item.trim()).map(item => ({ itemNeededName: item })),
    };

    updateListing(payload);
  };

  if (isLoading) {
    return (
      <div className="">
        <div className="border border-[#E9E9E9] px-8 py-4">
          <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
          <p className="text-[#222222] font-medium text-xl">
            Edit Item Listing
          </p>
        </div>
        <div className="grid grid-cols-[25%_40%_30%] justify-between gap-2 w-[95%] mx-auto my-8">
          <div className="flex flex-col gap-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="border border-[#EEEEEE] rounded-xl p-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !listingData?.result) {
    return (
      <div className="">
        <div className="border border-[#E9E9E9] px-8 py-4">
          <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
          <p className="text-[#222222] font-medium text-xl">
            Edit Item Listing
          </p>
        </div>
        <div className="w-[95%] mx-auto my-8 p-8 text-center">
          <p className="text-red-500 mb-4">Failed to load listing details</p>
          <Button variant="outline" onClick={() => router.push('/item-listing')}>
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="border border-[#E9E9E9] px-8 py-4">
        <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
        <p className="text-[#222222] font-medium text-xl">
          Edit Item Listing
        </p>
      </div>
      <div className="grid grid-cols-[25%_40%_30%] justify-between gap-2 w-[95%] mx-auto my-8">
        {/* Media Upload Section */}
        <div>
          <p className="text-sm font-medium mb-2">Upload Media</p>
          <div className="flex flex-col gap-3">
            {!uploadedMedia ? (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center h-64">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading ? (
                  <>
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload</p>
                    <p className="text-xs text-gray-400">Image or Video (single file)</p>
                  </>
                )}
              </label>
            ) : (
              <div className="relative border rounded-lg overflow-hidden h-64">
                {uploadedMedia.mediaType === "Image" ? (
                  <img src={uploadedMedia.url} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <video src={uploadedMedia.url} controls className="w-full h-full object-cover" />
                )}
                <button
                  onClick={removeMedia}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <Input
            label="Item Name *"
            placeholder="e.g Samsung Galaxy"
            type="text"
            value={formData.itemName}
            onChange={(e) => handleInputChange("itemName", e.target.value)}
          />
          
          <div>
            <label className="text-sm font-medium mb-2 block">Brief Description *</label>
            <Textarea
              placeholder="Condition, age, extras"
              value={formData.itemDescription}
              onChange={(e) => handleInputChange("itemDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Currency *</label>
            <Select value={formData.estimatedCurrency} onValueChange={(value) => handleInputChange("estimatedCurrency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(currency => (
                  <SelectItem key={currency.code} value={currency.code}>{currency.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            label="Estimated Monetary Value *"
            placeholder="0.00"
            type="number"
            value={formData.estimatedAmount || ""}
            onChange={(e) => handleInputChange("estimatedAmount", Number(e.target.value))}
          />

          <div>
            <label className="text-sm font-medium mb-2 block">Item Condition *</label>
            <Select value={formData.itemCondition} onValueChange={(value) => handleInputChange("itemCondition", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {ITEM_CONDITIONS.map(condition => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category *</label>
            <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.categoryName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            label="Location *"
            placeholder="e.g Lagos, Nigeria"
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />

          <div>
            <label className="text-sm font-medium mb-2 block">Requested Items for Swap (up to 3)</label>
            {requestedItems.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Item ${index + 1}`}
                  value={item}
                  onChange={(e) => handleRequestedItemChange(index, e.target.value)}
                />
                {requestedItems.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRequestedItem(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            {requestedItems.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addRequestedItem}
                className="w-full"
              >
                <Plus size={16} className="mr-2" /> Add Item
              </Button>
            )}
          </div>
        </div>
        <div>
          <div className="border border-[#EEEEEE] rounded-xl p-4">
            <p className="text-[#222222] font-medium text-xl">
              Listing Fee Summary
            </p>
            <div className="flex items-center justify-between my-8">
              <p>Listing Fee:</p>
              <p>----</p>
            </div>
            
            <div className="mb-4 text-sm">
              <p className="text-gray-600">Media: {uploadedMedia ? '1 file' : 'No file'}</p>
              <p className="text-gray-600">Items to swap: {requestedItems.filter(i => i.trim()).length}</p>
            </div>

            <Button 
              className={"rounded-full w-full"} 
              size={"lg"}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </div>
              ) : (
                "Update Listing"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemListing;

