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
import Image from "next/image";

const formSchema = z.object({
  fullname: z.string().min(5, "fullname must be greater 4"),
  username: z.string().min(5, "username must be greater 4"),
  address: z.string(),
  email: z.string().email(),
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const PersonalInfo: React.FC = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      address: "",
      email: "",
      type: "all",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    console.warn(values);
  }

  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">
        Personal Information
      </h6>
      <p className="text-sm text-[#737373] mb-8">
        Edit and manage your core details.
      </p>
      <div className="mb-8 flex items-center gap-5">
        <Image
          src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
          height={120}
          width={120}
          alt="User profile"
          className="w-[120px] h-[120px] rounded-full"
        />
        <div>
          <label
            htmlFor="profile-photo"
            className="cursor-pointer inline-block"
          >
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
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-[#1D2433]">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Admin name"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel className="text-[#1D2433]">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="No., 16, Saint Lucy Str,."
                    {...field}
                    className="h-12"
                  />
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
                  <Input
                    type="text"
                    placeholder="admin1524887@gmail.com"
                    {...field}
                    className="h-12"
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
                  <Textarea
                    placeholder="Sango-tedo"
                    className="resize-none"
                    {...field}
                  />
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
                      <FormLabel className="font-normal">
                        Visitor (browse and request swaps)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
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
            <Button className="w-auto !px-[3rem] py-4 font-bold text-base rounded-[1rem]">
              Save Change
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfo;
