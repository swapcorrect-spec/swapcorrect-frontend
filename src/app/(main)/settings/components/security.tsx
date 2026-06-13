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
import { useChangePassword } from "@/app/_hooks/queries/auth/auth";
import EyeClosedIcon from "@/app/assets/images/svgs/Eye_Closed.svg";
import EyeOpenIcon from "@/app/assets/images/svgs/Eye_Open.svg";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";

// const formSchema = z.object({
//   currentpassword: z.string(),
//   newpassword: z.string(),
//   confirmpassword: z.string(),
// });

// type FormSchemaType = z.infer<typeof formSchema>;
const formSchema = z
  .object({
    currentpassword: z.string().min(1, "Current password is required"),

    newpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character"
      ),

    confirmpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

const Security: React.FC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const { mutate, isPending } = useChangePassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result, {
        onAutoClose: () => {
          router.push(`${PATHS.LOGIN}`);
        },
      });
    },
    onError(_err) {
      console.log(_err);
      toast.error(_err);
    },
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    mutate({
      payload: {
        oldPassword: values.currentpassword,
        newPassword: values.newpassword,
      },
    });
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);

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
              <FormItem className="w-full md:w-1/4 mb-6">
                <FormLabel className="text-[#111827]">Current Password</FormLabel>
                <FormControl>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="admin1524887"
                    {...field}
                    className="h-12"
                    endIcon={
                      <button
                        type="button"
                        onClick={toggleOldPasswordVisibility}
                        className="focus:outline-none"
                      >
                        {showOldPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-5 mb-6 w-full md:w-1/2">
            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem className="w-full mb-6">
                  <FormLabel className="text-[#111827]">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="admin1524887"
                      {...field}
                      className="h-12"
                      endIcon={
                        <button
                          type="button"
                          onClick={toggleNewPasswordVisibility}
                          className="focus:outline-none"
                        >
                          {showNewPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                      }
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
                  <FormLabel className="text-[#111827]">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="admin1524887"
                      {...field}
                      className="h-12"
                      endIcon={
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-5 justify-start">
            <Button
              className="w-full md:w-auto py-4 font-medium text-base !rounded-[1rem] md:!px-[3rem]"
              loading={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="flex items-center gap-4 mt-6">
        <div className="flex-1">
          <h6 className="text-[#222222] font-medium text-base">Two-Factor Authentication</h6>
          <p className="text-sm text-[#737373]">Add an extra layer of security to your account.</p>
        </div>
        <Switch id="2fa" onCheckedChange={onOpenChange} />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="left-[50%] max-w-[800px] translate-x-[-50%] overflow--y-scrollp-5">
          <EnableFAContent handleClose={onOpenChange} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Security;
