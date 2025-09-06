"use client";
import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { PinInput } from "react-input-pin-code";

import AuthForm from "@/components/shared/AuthForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import EmailIcon from "@/app/assets/images/svgs/Email.svg";
import PasswordIcon from "@/app/assets/images/svgs/Password.svg";
import EyeClosedIcon from "@/app/assets/images/svgs/Eye_Closed.svg";

import { PATHS } from "@/app/_constants/paths";

import { getValidationSchema } from "@/app/(auth)/forgot-password/_validation";

import { useForgotPassword, useResetPassword } from "@/app/_hooks/queries/auth/auth";
import { ForgotPassword as ForgotPasswordProp, ResetPassword } from "@/app/_hooks/queries/auth/auth.type";

type formStep = "email" | "code" | "password";

const ForgotPassword: FC = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState<formStep>("email");

  const validationSchemas = useMemo(() => getValidationSchema(formStep), [formStep]);

  const { mutate, isPending } = useForgotPassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result);
      setFormStep("code");
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } = useResetPassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result, {
        onAutoClose: () => {
          router.push(`${PATHS.LOGIN}`);
        },
      });
      setFormStep("email");
      resetForm();
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const handleForgotPassword = (data: ForgotPasswordProp) => {
    mutate({
      payload: {
        email: data.email,
      },
    });
  };

  const handleResetPassword = (data: ResetPassword) => {
    const token = Array.isArray(data.token) ? data.token.join("") : data.token;

    mutateResetPassword({
      payload: {
        token,
        email: data.email,
        password: data.password,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      token: ["", "", "", "", "", ""],
      password: "",
      confirm_password: "",
    },

    onSubmit: formStep === "email" ? handleForgotPassword : handleResetPassword,
    validateOnBlur: false,
    validationSchema: validationSchemas,
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue, resetForm } = formik;

  return (
    <AuthForm title="" subtitle="">
      <div className="mb-10">
        {formStep === "email" ? (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">Forgot Password</h1>
            <p className="text-[#737373] text-base font-normal text-left mt-2 mb-8 leading-tight">
              Enter Your Registered Email
            </p>
          </>
        ) : formStep === "code" ? (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">Input Email Verification Code</h1>
            <p className="text-[#737373] text-base font-normal text-left mt-2 mb-8 leading-tight">
              Enter the 6 digits code sent to {values.email}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">Create New Password</h1>
            <p className="text-[#737373] text-base font-normal text-left mt-2 mb-8 leading-tight">
              Enter Your New Password
            </p>
          </>
        )}
      </div>
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
        {formStep === "email" ? (
          <>
            <Input
              type="email"
              placeholder="Email address"
              startIcon={<EmailIcon />}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
            />
          </>
        ) : formStep === "code" ? (
          <div>
            <PinInput
              values={values.token}
              onChange={(_, __, values) => {
                setFieldValue("token", values);
              }}
              onComplete={() => {
                setFormStep("password");
              }}
              containerClassName="justify-between"
              size="md"
              id="code"
              inputStyle={{
                width: "5rem",
                height: "5rem",
                fontSize: "2rem",
                textAlign: "center",
              }}
            />
            {errors.token && touched.token && (
              <div className="mt-1 text-sm text-red-500 min-h-[1rem]">{errors.token}</div>
            )}
          </div>
        ) : (
          <>
            <Input
              type="password"
              placeholder="Password"
              startIcon={<PasswordIcon />}
              endIcon={<EyeClosedIcon />}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              startIcon={<PasswordIcon />}
              endIcon={<EyeClosedIcon />}
              name="confirm_password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirm_password}
              error={errors.confirm_password}
            />
          </>
        )}
        <Button
          variant={"default"}
          className="rounded-full py-6 mt-2 md:mt-4"
          type="submit"
          loading={isPending || isPendingResetPassword}
        >
          {formStep === "password" ? "Reset Password" : "Send"}
        </Button>
        <p className="text-center pb-10 md:pb-0">
          Continue to{" "}
          <Link href={PATHS.LOGIN} className="text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
