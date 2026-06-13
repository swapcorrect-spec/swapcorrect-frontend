"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetUserInfo, useUpdateProfile, useUpdateRole } from "@/app/_hooks/queries/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CircularProgress } from "@/components/shared/circular-progress";
import { useEffect, useState } from "react";

const formSchema = z.object({
  firstname: z.string().nonempty("Required"),
  lastname: z.string().nonempty("Required"),
  phone: z.string().nonempty("Required"),
  username: z.string().min(5, "Username must be greater 4"),
  address: z.string(),
  email: z.string().email().nonempty("Required"),
  type: z.enum(["", "Swapper", "Visitor"], {
    required_error: "You need to select a role type.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const PersonalInfo: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useGetUserInfo({ enabler: true });
  const [uploadedMedia, setUploadedMedia] = useState<{ mediaType: string; url: string } | null>(
    null
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const { mutate, isPending } = useUpdateRole({
    onSuccess(_val: { result: string }) {
      // handleToggleSwapperUpgrade();
      queryClient.invalidateQueries({ queryKey: ["useGetUserInfo"] });
      toast.success(_val.result, {
        onAutoClose: () => {},
      });
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const { mutate: mutateProfile, isPending: isPendingProfile } = useUpdateProfile({
    onSuccess(_val: { result: string }) {
      queryClient.invalidateQueries({ queryKey: ["useGetUserInfo"] });
      toast.success(_val.result, {
        onAutoClose: () => {},
      });
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: data?.result.firstName || "",
      lastname: data?.result.lastName || "",
      username: data?.result.userName || "",
      address: data?.result.deliveryAddress || "",
      email: data?.result.email || "",
      phone: data?.result.phoneNumber || "",
      type: "",
    },
  });

  useEffect(() => {
    if (data?.result) {
      setProfileImage(data.result.profilePicture || "");

      form.reset({
        firstname: data.result.firstName || "",
        lastname: data.result.lastName || "",
        username: data.result.userName || "",
        address: data.result.deliveryAddress || "",
        email: data.result.email || "",
        phone: data.result.phoneNumber || "",
        type: data.result.userRole?.[0] || "Visitor",
      });
    }
  }, [data, form]);

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    console.warn(values);
  }

  const handleUpgradeRole = (role: "Visitor" | "Swapper") => {
    mutate({
      payload: {
        role,
      },
    });
  };

  const handleSave = () => {
    const values = form.getValues();

    mutateProfile({
      payload: {
        firstName: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.phone,
        profileImageUrl: profileImage,
      },
    });
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take first file
    setIsUploading(true);

    const result = await uploadToCloudinary(file);
    if (result) {
      setUploadedMedia(result);
      setProfileImage(result.url);
    }

    setIsUploading(false);
    if (e.target) e.target.value = "";
  };

  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">Personal Information</h6>
      <p className="text-sm text-[#737373] mb-8">Edit and manage your core details.</p>
      <div className="mb-8 flex items-center gap-5">
        {/* <Avatar className="w-32 h-32">
          <AvatarImage width={"300px"} sizes="200px" src={data?.result.profilePicture as string} />
          <AvatarFallback className="font-bold text-lg">{`${data?.result?.firstName?.charAt(
            0
          )} ${data?.result?.lastName?.charAt(0)}`}</AvatarFallback>
        </Avatar> */}
        {/* <Avatar className="w-32 h-32">
          <AvatarImage
            src={profileImage}
            alt={`${data?.result?.firstName} ${data?.result?.lastName}`}
          />
          <AvatarFallback className="font-bold text-lg">
            {`${data?.result?.firstName?.charAt(0) ?? ""}${
              data?.result?.lastName?.charAt(0) ?? ""
            }`}
          </AvatarFallback>
        </Avatar> */}
        <div className="relative w-32 h-32">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profileImage}
              alt={`${data?.result?.firstName} ${data?.result?.lastName}`}
            />
            <AvatarFallback className="font-bold text-lg">
              {`${data?.result?.firstName?.charAt(0) ?? ""}${
                data?.result?.lastName?.charAt(0) ?? ""
              }`}
            </AvatarFallback>
          </Avatar>

          {isUploading && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
              <CircularProgress size={32} color="white" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="profile-photo" className="cursor-pointer inline-block">
            <div className="border border-[#E2E2E2] rounded-md py-2 px-4 font-medium text-xs shadow-md text-center">
              Change photo
            </div>
            <input
              type="file"
              id="profile-photo"
              accept="image/png, image/jpeg"
              className="hidden"
              // onChange={(e) => {
              //   const file = e.target.files?.[0];
              //   if (file) {
              //     console.log("Selected file:", file);
              //   }
              // }}
              onChange={handleFileSelect}
            />
            {/* <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                /> */}
          </label>
          <p className="font-medium text-xs mt-3">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="text-[#1D2433]">Firstname</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter firstname" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="text-[#1D2433]">Lastname</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter lastname" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="text-[#1D2433]">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter username"
                      {...field}
                      className="h-12"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full mb-4">
                  <FormLabel className="text-[#1D2433]">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter phone number"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-[#1D2433]">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter email address"
                    {...field}
                    className="h-12"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Sango-tedo" className="resize-none" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="flex items-center gap-2">
                  Swap Role
                  {isPending && <CircularProgress size={14} color="blue" />}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      // console.log(value);
                      field.onChange(value);
                      handleUpgradeRole(value === "Swapper" ? "Swapper" : "Visitor");
                    }}
                    defaultValue={data?.result?.userRole[0]}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Visitor" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Visitor (browse and request swaps)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Swapper" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Swapper (list items and accept swaps)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-5 justify-end flex mt-6">
            <Button
              className="w-auto !px-[3rem] py-4 font-bold text-base rounded-[1rem]"
              onClick={form.handleSubmit(handleSave)}
              loading={isPendingProfile || isUploading}
            >
              Save Change
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
