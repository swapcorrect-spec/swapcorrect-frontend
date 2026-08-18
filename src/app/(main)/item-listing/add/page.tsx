// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { Plus, X, Upload } from "lucide-react";
// import { useCreateListing } from "@/app/_hooks/queries/listing/listing";
// import { useGetAllCategories } from "@/app/_hooks/queries/listing/listing";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const ITEM_CONDITIONS = ["New", "Fairly Used", "Used", "Needs Repair"];
// const CURRENCIES = [
//   { code: "NGN", name: "Nigerian Naira (₦)" },
//   { code: "USD", name: "US Dollar ($)" },
//   { code: "GBP", name: "British Pound (£)" },
//   { code: "EUR", name: "Euro (€)" },
//   { code: "GHS", name: "Ghanaian Cedi (GH₵)" },
//   { code: "KES", name: "Kenyan Shilling (KSh)" },
//   { code: "ZAR", name: "South African Rand (R)" },
// ];

// const NewItemListing = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     listType: "Swap",
//     itemName: "",
//     estimatedCurrency: "NGN",
//     estimatedAmount: 0,
//     itemDescription: "",
//     categoryId: "",
//     itemCondition: "",
//     location: "",
//   });

//   const [requestedItems, setRequestedItems] = useState<string[]>([""]);
//   const [uploadedMedia, setUploadedMedia] = useState<{ mediaType: string; url: string } | null>(null);
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const { data: categoriesData } = useGetAllCategories({ enabler: true });
//   const { createListing, isPending } = useCreateListing({
//     onSuccess: () => {
//       router.push('/item-listing');
//     }
//   });

//   const handleInputChange = (field: string, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRequestedItemChange = (index: number, value: string) => {
//     const newItems = [...requestedItems];
//     newItems[index] = value;
//     setRequestedItems(newItems);
//   };

//   const addRequestedItem = () => {
//     if (requestedItems.length < 3) {
//       setRequestedItems([...requestedItems, ""]);
//     }
//   };

//   const removeRequestedItem = (index: number) => {
//     setRequestedItems(requestedItems.filter((_, i) => i !== index));
//   };

//   const uploadToCloudinary = async (file: File) => {
//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

//     if (!cloudName || !uploadPreset) {
//       toast.error("Cloudinary configuration missing!");
//       return null;
//     }

//     let resourceType = "auto";
//     if (file.type.startsWith("image/")) {
//       resourceType = "image";
//     } else if (file.type.startsWith("video/")) {
//       resourceType = "video";
//     } else {
//       resourceType = "raw";
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);
//     formData.append("folder", "swap_shop/listings");

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       return {
//         url: data.secure_url,
//         mediaType: file.type.startsWith("image/") ? "Image" : file.type.startsWith("video/") ? "Video" : "File"
//       };
//     } catch (error) {
//       console.error("Error uploading:", error);
//       return null;
//     }
//   };

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const file = files[0]; // Only take first file
//     setIsUploading(true);

//     const result = await uploadToCloudinary(file);
//     if (result) {
//       setUploadedMedia(result);
//     }

//     setIsUploading(false);
//     if (e.target) e.target.value = "";
//   };

//   const removeMedia = () => {
//     setUploadedMedia(null);
//   };

//   const handleSubmit = () => {
//     // Validate
//     if (!formData.itemName || !formData.categoryId || !formData.itemCondition || !formData.location) {
//       toast.error("Please fill all required fields!");
//       return;
//     }

//     if (!uploadedMedia) {
//       toast.error("Please upload at least one media file!");
//       return;
//     }

//     const payload = {
//       ...formData,
//       listMediaFiles: [uploadedMedia], // Wrap in array
//       listingSwapReq: requestedItems.filter(item => item.trim()).map(item => ({ itemNeededName: item })),
//     };

//     createListing(payload);
//   };

//   return (
//     <div className="">
//       <div className="border border-[#E9E9E9] px-8 py-4">
//         <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
//         <p className="text-[#222222] font-medium text-xl">
//           List a New Item for Swap
//         </p>
//       </div>
//       <div className="grid grid-cols-[25%_40%_30%] justify-between gap-2 w-[95%] mx-auto my-8">
//         {/* Media Upload Section */}
//         <div>
//           <p className="text-sm font-medium mb-2">Upload Media</p>
//           <div className="flex flex-col gap-3">
//             {/* Upload Button or Preview */}
//             {!uploadedMedia ? (
//               <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center h-64">
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   disabled={isUploading}
//                 />
//                 {isUploading ? (
//                   <>
//                     <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
//                     <p className="text-sm text-gray-600">Uploading...</p>
//                   </>
//                 ) : (
//                   <>
//                     <Upload size={32} className="text-gray-400 mb-2" />
//                     <p className="text-sm text-gray-600">Click to upload</p>
//                     <p className="text-xs text-gray-400">Image or Video (single file)</p>
//                   </>
//                 )}
//               </label>
//             ) : (
//               <div className="relative border rounded-lg overflow-hidden h-64">
//                 {uploadedMedia.mediaType === "Image" ? (
//                   <img src={uploadedMedia.url} alt="Preview" className="w-full h-full object-cover" />
//                 ) : (
//                   <video src={uploadedMedia.url} controls className="w-full h-full object-cover" />
//                 )}
//                 <button
//                   onClick={removeMedia}
//                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="flex flex-col gap-4">
//           <Input
//             label="Item Name *"
//             placeholder="e.g Samsung Galaxy"
//             type="text"
//             value={formData.itemName}
//             onChange={(e) => handleInputChange("itemName", e.target.value)}
//           />

//           <div>
//             <label className="text-sm font-medium mb-2 block">Brief Description *</label>
//             <Textarea
//               placeholder="Condition, age, extras"
//               value={formData.itemDescription}
//               onChange={(e) => handleInputChange("itemDescription", e.target.value)}
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-2 block">Currency *</label>
//             <Select value={formData.estimatedCurrency} onValueChange={(value) => handleInputChange("estimatedCurrency", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select currency" />
//               </SelectTrigger>
//               <SelectContent>
//                 {CURRENCIES.map(currency => (
//                   <SelectItem key={currency.code} value={currency.code}>{currency.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Input
//             label="Estimated Monetary Value *"
//             placeholder="0.00"
//             type="number"
//             value={formData.estimatedAmount || ""}
//             onChange={(e) => handleInputChange("estimatedAmount", Number(e.target.value))}
//           />

//           <div>
//             <label className="text-sm font-medium mb-2 block">Item Condition *</label>
//             <Select value={formData.itemCondition} onValueChange={(value) => handleInputChange("itemCondition", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select condition" />
//               </SelectTrigger>
//               <SelectContent>
//                 {ITEM_CONDITIONS.map(condition => (
//                   <SelectItem key={condition} value={condition}>{condition}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-2 block">Category *</label>
//             <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categoriesData?.map((cat: any) => (
//                   <SelectItem key={cat.id} value={cat.id}>{cat.categoryName}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Input
//             label="Location *"
//             placeholder="e.g Lagos, Nigeria"
//             type="text"
//             value={formData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//           />

//           <div>
//             <label className="text-sm font-medium mb-2 block">Requested Items for Swap (up to 3)</label>
//             {requestedItems.map((item, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <Input
//                   placeholder={`Item ${index + 1}`}
//                   value={item}
//                   onChange={(e) => handleRequestedItemChange(index, e.target.value)}
//                 />
//                 {requestedItems.length > 1 && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => removeRequestedItem(index)}
//                   >
//                     <X size={16} />
//                   </Button>
//                 )}
//               </div>
//             ))}
//             {requestedItems.length < 3 && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={addRequestedItem}
//                 className="w-full"
//               >
//                 <Plus size={16} className="mr-2" /> Add Item
//               </Button>
//             )}
//           </div>
//         </div>
//         <div>
//           <div className="border border-[#EEEEEE] rounded-xl p-4">
//             <p className="text-[#222222] font-medium text-xl">
//               Listing Fee Summary
//             </p>
//             <div className="flex items-center justify-between my-8">
//               <p>Listing Fee:</p>
//               <p>----</p>
//             </div>

//             {/* Summary */}
//             <div className="mb-4 text-sm">
//               <p className="text-gray-600">Media: {uploadedMedia ? '1 file' : 'No file'}</p>
//               <p className="text-gray-600">Items to swap: {requestedItems.filter(i => i.trim()).length}</p>
//             </div>

//             <Button
//               className={"rounded-full w-full"}
//               size={"lg"}
//               onClick={handleSubmit}
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Creating...
//                 </div>
//               ) : (
//                 "List Item for Swap"
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewItemListing;

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useCreateListing } from "@/app/_hooks/queries/listing/listing";
import { useGetAllCategories } from "@/app/_hooks/queries/listing/listing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sanitizeText } from "@/lib/sanitize";

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

interface UploadedMedia {
  mediaType: string;
  url: string;
}

const NewItemListing = () => {
  const router = useRouter();
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
  // Changed state to an array of media objects
  const [uploadedMediaList, setUploadedMediaList] = useState<UploadedMedia[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data: categoriesData } = useGetAllCategories({ enabler: true });
  const { createListing, isPending } = useCreateListing({
    onSuccess: () => {
      router.push("/item-listing");
    },
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const uploadToCloudinary = async (file: File): Promise<UploadedMedia | null> => {
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

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("folder", "swap_shop/listings");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const resData = await response.json();
      return {
        url: resData.secure_url,
        mediaType: file.type.startsWith("image/")
          ? "Image"
          : file.type.startsWith("video/")
            ? "Video"
            : "File",
      };
    } catch (error) {
      console.error("Error uploading:", error);
      return null;
    }
  };

  // Handles selecting multiple files and uploads them concurrently
  // const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0) return;

  //   setIsUploading(true);

  //   const uploadPromises = Array.from(files).map((file) => uploadToCloudinary(file));

  //   try {
  //     const results = await Promise.all(uploadPromises);
  //     const successfulUploads = results.filter((res): res is UploadedMedia => res !== null);

  //     if (successfulUploads.length > 0) {
  //       setUploadedMediaList((prev) => [...prev, ...successfulUploads]);
  //       toast.success(`Successfully uploaded ${successfulUploads.length} file(s)!`);
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred during upload.");
  //   } finally {
  //     setIsUploading(false);
  //     if (e.target) e.target.value = "";
  //   }
  // };

  // Handles selecting multiple files and uploads them concurrently (max 3)
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentCount = uploadedMediaList.length;
    const incomingCount = files.length;

    // 1. Check if they are already at the limit
    if (currentCount >= 3) {
      toast.error("You can only upload a maximum of 3 media files.");
      if (e.target) e.target.value = "";
      return;
    }

    // 2. Check if the incoming files exceed the remaining allowance
    if (currentCount + incomingCount > 3) {
      toast.error(`You can only add ${3 - currentCount} more file(s).`);
      if (e.target) e.target.value = "";
      return;
    }

    setIsUploading(true);

    const uploadPromises = Array.from(files).map((file) => uploadToCloudinary(file));

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((res): res is UploadedMedia => res !== null);

      if (successfulUploads.length > 0) {
        setUploadedMediaList((prev) => [...prev, ...successfulUploads]);
        toast.success(`Successfully uploaded ${successfulUploads.length} file(s)!`);
      }
    } catch (error) {
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const removeMedia = (indexToRemove: number) => {
    setUploadedMediaList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    if (
      !formData.itemName ||
      !formData.categoryId ||
      !formData.itemCondition ||
      !formData.location
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (uploadedMediaList.length === 0) {
      toast.error("Please upload at least one media file!");
      return;
    }

    const payload = {
      ...formData,
      itemName: sanitizeText(formData.itemName),
      itemDescription: sanitizeText(formData.itemDescription),
      location: sanitizeText(formData.location),
      listMediaFiles: uploadedMediaList, // Send the complete array
      listingSwapReq: requestedItems
        .filter((item) => item.trim())
        .map((item) => ({ itemNeededName: sanitizeText(item) })),
    };

    createListing(payload);
  };

  return (
    <div className="">
      <div className="border border-[#E9E9E9] px-8 py-4">
        <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
        <p className="text-[#222222] font-medium text-xl">List a New Item for Swap</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[25%_40%_30%] justify-between gap-6 lg:gap-2 w-full max-w-[95%] mx-auto my-8 px-4 sm:px-6 lg:px-0">
        {/* Media Upload Section */}
        <div>
          <p className="text-sm font-medium mb-2">Upload Media *</p>
          <div className="flex flex-col gap-3">
            {/* Upload Area */}
            {/* <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center h-40">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                multiple // Allows selecting multiple files in the file explorer
                disabled={isUploading}
              />
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-gray-600">Uploading files...</p>
                </>
              ) : (
                <>
                  <Upload size={28} className="text-gray-400 mb-1" />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">Images or Videos (multiple allowed)</p>
                </>
              )}
            </label> */}
            <label
              className={`border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-40 transition-colors
    ${
      uploadedMediaList.length >= 3 || isUploading
        ? "cursor-not-allowed bg-gray-100 opacity-60 pointer-events-none"
        : "cursor-pointer hover:border-blue-500"
    }`}
              onClick={(e) => {
                // Completely blocks the file picker from opening if maximum limit is reached
                if (uploadedMediaList.length >= 3 || isUploading) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                multiple
                disabled={isUploading || uploadedMediaList.length >= 3}
              />
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-gray-600">Uploading files...</p>
                </>
              ) : uploadedMediaList.length >= 3 ? (
                <>
                  <Upload size={28} className="text-gray-400 mb-1" />
                  <p className="text-sm font-medium text-gray-500">Maximum limit reached</p>
                  <p className="text-xs text-gray-400">Remove a file to upload another</p>
                </>
              ) : (
                <>
                  <Upload size={28} className="text-gray-400 mb-1" />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">Images or Videos (multiple allowed)</p>
                </>
              )}
            </label>

            {/* Media Gallery Grid */}
            {uploadedMediaList.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 mt-2 max-h-[250px] sm:max-h-[350px] overflow-y-auto p-1 border rounded-lg bg-gray-50">
                {uploadedMediaList.map((media, index) => (
                  <div
                    key={index}
                    className="relative aspect-square max-w-[100px] sm:max-w-none border rounded-lg overflow-hidden bg-white justify-self-center"
                  >
                    {media.mediaType === "Image" ? (
                      <img
                        src={media.url}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video src={media.url} className="w-full h-full object-cover" muted />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
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
            <Select
              value={formData.estimatedCurrency}
              onValueChange={(value) => handleInputChange("estimatedCurrency", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.name}
                  </SelectItem>
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
            <Select
              value={formData.itemCondition}
              onValueChange={(value) => handleInputChange("itemCondition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {ITEM_CONDITIONS.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category *</label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => handleInputChange("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData?.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </SelectItem>
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
            <label className="text-sm font-medium mb-2 block">
              Requested Items for Swap (up to 3)
            </label>
            {requestedItems.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Item ${index + 1}`}
                  value={item}
                  onChange={(e) => handleRequestedItemChange(index, e.target.value)}
                />
                {requestedItems.length > 1 && (
                  <Button variant="outline" size="sm" onClick={() => removeRequestedItem(index)}>
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            {requestedItems.length < 3 && (
              <Button variant="outline" size="sm" onClick={addRequestedItem} className="w-full">
                <Plus size={16} className="mr-2" /> Add Item
              </Button>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div>
          <div className="border border-[#EEEEEE] rounded-xl p-4">
            <p className="text-[#222222] font-medium text-xl">Listing Fee Summary</p>
            <div className="flex items-center justify-between my-8">
              <p>Listing Fee:</p>
              <p>----</p>
            </div>

            {/* Summary */}
            <div className="mb-4 text-sm">
              <p className="text-gray-600">Media: {uploadedMediaList.length} file(s) uploaded</p>
              <p className="text-gray-600">
                Items to swap: {requestedItems.filter((i) => i.trim()).length}
              </p>
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
                  Creating...
                </div>
              ) : (
                "List Item for Swap"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItemListing;
