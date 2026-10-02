"use client";
import { FC, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

import {
  useForgotPassword,
  useResendForgetPasswordEmail,
  useResetPassword,
} from "@/app/_hooks/queries/auth/auth";
import {
  ForgotPassword as ForgotPasswordProp,
  ResetPassword,
} from "@/app/_hooks/queries/auth/auth.type";

type formStep = "email" | "code" | "password";
const FORGOT_PASSWORD_EMAIL_SESSION_KEY = "forgot-password-confirmed-email";

const ForgotPasswordForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";
  const submittedEmail = useRef("");
  const [formStep, setFormStep] = useState<formStep>("email");
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const validationSchemas = useMemo(() => getValidationSchema(formStep), [formStep]);

  useEffect(() => {
    if (formStep !== "code" || secondsRemaining === 0) return;

    const countdown = window.setTimeout(() => {
      setSecondsRemaining((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearTimeout(countdown);
  }, [formStep, secondsRemaining]);

  const { mutate, isPending } = useForgotPassword({
    onSuccess(_val: { result: string }) {
      toast.success(_val.result);
      sessionStorage.setItem(FORGOT_PASSWORD_EMAIL_SESSION_KEY, submittedEmail.current);
      router.replace(`/forgot-password?email=${encodeURIComponent(submittedEmail.current)}`);
      setSecondsRemaining(60);
      setFormStep("code");
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const { mutate: resendForgetPasswordEmail, isPending: isResendingEmail } =
    useResendForgetPasswordEmail({
      onSuccess(_val: { result: string }) {
        toast.success(_val.result || "A new password reset email has been sent.");
        setSecondsRemaining(60);
      },
      onError(_err) {
        toast.error(_err);
      },
    });

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } = useResetPassword({
    onSuccess(_val: { result: string }) {
      sessionStorage.removeItem(FORGOT_PASSWORD_EMAIL_SESSION_KEY);
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
    sessionStorage.removeItem(FORGOT_PASSWORD_EMAIL_SESSION_KEY);
    submittedEmail.current = data.email;
    mutate({
      payload: {
        email: data.email,
      },
    });
  };

  const handleResendForgetPasswordEmail = () => {
    if (!submittedEmail.current || isResendingEmail) return;
    resendForgetPasswordEmail({ payload: { email: submittedEmail.current } });
  };

  const handleVerifyCode = () => {
    setFormStep("password");
  };

  const handleResetPassword = (data: ResetPassword) => {
    const token = Array.isArray(data.token) ? data.token.join("") : data.token;

    mutateResetPassword({
      payload: {
        token,
        email: submittedEmail.current || data.email,
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

    onSubmit:
      formStep === "email"
        ? handleForgotPassword
        : formStep === "code"
          ? handleVerifyCode
          : handleResetPassword,
    validateOnBlur: false,
    validationSchema: validationSchemas,
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = formik;

  useEffect(() => {
    const confirmedEmail = sessionStorage.getItem(FORGOT_PASSWORD_EMAIL_SESSION_KEY);

    if (emailFromUrl && emailFromUrl === confirmedEmail) {
      submittedEmail.current = confirmedEmail;
      setFieldValue("email", confirmedEmail, false);
      setFormStep("code");
    }
  }, [emailFromUrl, setFieldValue]);

  return (
    <AuthForm title="" subtitle="">
      <div className="mb-10">
        {formStep === "email" ? (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">
              Forgot Password
            </h1>
            <p className="text-[#737373] text-base font-normal text-left mt-2 mb-8 leading-tight">
              Enter Your Registered Email
            </p>
          </>
        ) : formStep === "code" ? (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">
              Input Email Verification Code
            </h1>
            <p className="text-[#737373] text-base font-normal text-left mt-2 mb-8 leading-tight">
              Enter the 6 digits code sent to {submittedEmail.current}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[#000000] text-2xl md:text-4xl text-left font-medium">
              Create New Password
            </h1>
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

            <div className="mt-6 mb-0 text-left" aria-live="polite">
              {secondsRemaining > 0 ? (
                <p className="text-sm text-[#737373]">
                  You can request another email in {secondsRemaining} seconds.
                </p>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#737373]">Didn’t receive the email?</span>
                  <button
                    type="button"
                    onClick={handleResendForgetPasswordEmail}
                    disabled={!submittedEmail.current || isResendingEmail}
                    className="font-medium text-[#007AFF] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isResendingEmail ? "Sending..." : "Resend email"}
                  </button>
                </div>
              )}
            </div>
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
          className="bg-[#007AFF] hover:bg-[#0062cc] rounded-full py-6 mt-2 md:mt-4"
          type="submit"
          loading={isPending || isPendingResetPassword}
        >
          {formStep === "email"
            ? "Reset Password"
            : formStep === "password"
              ? "Reset Password"
              : "Continue"}
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

const ForgotPassword: FC = () => (
  <Suspense fallback={<div className="min-h-[50vh]" />}>
    <ForgotPasswordForm />
  </Suspense>
);

export default ForgotPassword;
