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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnableFAContent from "./enable-fa";

const formSchema = z.object({
  currentpassword: z.string(),
  newpassword: z.string(),
  confirmpassword: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Security: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: FormSchemaType) {
    await Promise.resolve(true);
    console.warn(values);
  }

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">Security</h6>
      <p className="text-sm text-[#737373] mb-8">
        Manage how you log in and keep your account safe.
      </p>
      <h6 className="text-[#111827] text-xl font-bold mb-6">Change Password</h6>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <FormField
            control={form.control}
            name="currentpassword"
            render={({ field }) => (
              <FormItem className="w-1/4 mb-6">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="admin1524887"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 mb-6 w-1/2">
            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem className="w-full mb-6">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="admin1524887"
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
              name="confirmpassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="admin1524887"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-5 justify-start flex">
            <Button className="w-auto py-4 font-medium text-base !rounded-[1rem] !px-[3rem]">
              Update Password
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex items-center gap-4 mt-6">
        <div className="flex-1">
          <h6 className="text-[#222222] font-medium text-base">
            Two-Factor Authentication
          </h6>
          <p className="text-sm text-[#737373]">
            Add an extra layer of security to your account.
          </p>
        </div>
        <Switch id="2fa" onCheckedChange={onOpenChange} />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="left-[50%] max-w-[800px] translate-x-[-50%] overflow--y-scrollp-5">
          <EnableFAContent handleClose={onOpenChange} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Security;
