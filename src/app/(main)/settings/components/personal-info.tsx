"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  firstname: z.string().nonempty("Required"),
  lastname: z.string().nonempty("Required"),
  username: z.string().min(5, "Username must be greater 4"),
  address: z.string(),
  email: z.string().email().nonempty("Required"),
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const PersonalInfo: React.FC = () => {
  const { data } = useGetUserInfo({ enabler: true });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: data?.result.firstName || "",
      lastname: data?.result.lastName || "",
      username: data?.result.userName || "",
      address: data?.result.deliveryAddress || "",
      email: data?.result.email || "",
      type: "all",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    console.warn(values);
  }

  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">Personal Information</h6>
      <p className="text-sm text-[#737373] mb-8">Edit and manage your core details.</p>
      <div className="mb-8 flex items-center gap-5">
        <Avatar className="w-32 h-32">
          <AvatarImage width={"300px"} sizes="200px" src={data?.result.profilePicture as string} />
          <AvatarFallback className="font-bold text-lg">{`${data?.result?.firstName?.charAt(
            0
          )} ${data?.result?.lastName?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div>
          <label htmlFor="profile-photo" className="cursor-pointer inline-block">
            <div className="border border-[#E2E2E2] rounded-md py-2 px-4 font-medium text-xs shadow-md text-center">
              Change photo
            </div>
            <input
              type="file"
              id="profile-photo"
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Selected file:", file);
                }
              }}
            />
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-[#1D2433]">Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter username" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-[#1D2433]">Email Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter email address" {...field} className="h-12" />
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
                <FormLabel>Swap Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">Visitor (browse and request swaps)</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">Swapper (list items and accept swaps)</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-5 justify-end flex mt-6">
            <Button className="w-auto !px-[3rem] py-4 font-bold text-base rounded-[1rem]">Save Change</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
