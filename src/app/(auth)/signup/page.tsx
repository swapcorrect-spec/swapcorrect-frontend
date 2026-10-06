"use client";

import { FC, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { PATHS } from "@/app/_constants/paths";

import AuthForm from "@/components/shared/AuthForm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import UserIcon from "@/app/assets/images/svgs/User.svg";
import EmailIcon from "@/app/assets/images/svgs/Email.svg";
import AddressIcon from "@/app/assets/images/svgs/Address.svg";
import PasswordIcon from "@/app/assets/images/svgs/Password.svg";
import EyeClosedIcon from "@/app/assets/images/svgs/Eye_Closed.svg";
import EyeOpenIcon from "@/app/assets/images/svgs/Eye_Open.svg";
import { signupPayload, validationSchema } from "@/app/(auth)/signup/_validation";
import { useConfirmEmail, useRegister } from "@/app/_hooks/queries/auth/auth";
import { SelectFilter } from "@/components/shared/filters/select";
import { countries } from "@/app/_constants/countries";
import { ROLES } from "@/app/_constants/roles";

const SignupForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";
  const submittedEmail = useRef(emailFromUrl);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isTogglePassword, setIsTogglePassword] = useState({
    password: false,
    confirm_password: false,
  });

  const toggleVisibility = (field: "password" | "confirm_password") => {
    setIsTogglePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { mutate, isPending, isSuccess } = useRegister({
    onSuccess() {
      router.replace(`/signup?email=${encodeURIComponent(submittedEmail.current)}`);
      setSecondsRemaining(60);
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const { mutate: resendConfirmationEmail, isPending: isResendingEmail } = useConfirmEmail({
    onSuccess() {
      toast.success("A new confirmation email has been sent.");
      setSecondsRemaining(60);
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  useEffect(() => {
    if (!isSuccess || secondsRemaining === 0) return;

    const countdown = window.setTimeout(() => {
      setSecondsRemaining((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearTimeout(countdown);
  }, [isSuccess, secondsRemaining]);

  const handleResendConfirmationEmail = () => {
    if (!emailFromUrl || isResendingEmail) return;
    resendConfirmationEmail({ payload: { email: emailFromUrl } });
  };

  const handleLogin = (data: signupPayload) => {
    submittedEmail.current = data.email;
    mutate({
      payload: {
        firstName: data.firstname,
        lastName: data.lastname,
        gender: data.gender,
        country: data.country,
        deliveryAddress: data.address,
        password: data.password,
        phoneNumber: data.phone,
        role: ROLES.VISITOR,
        state: data.state,
        city: data.city,
        email: data.email,
        userName: data.username,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      country: "",
      password: "",
      username: "",
      confirm_password: "",
      state: "",
      city: "",
    },
    onSubmit: handleLogin,
    validateOnBlur: false,
    validationSchema,
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, setFieldValue } = formik;

  return (
    <>
      {!isSuccess ? (
        <AuthForm
          title="Welcome to SwapCorrect!"
          subtitle="Create your free account and start swapping instantly."
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                type="text"
                placeholder="Firstname"
                startIcon={<UserIcon />}
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.firstname}
              />
              <Input
                type="text"
                placeholder="Lastname"
                startIcon={<UserIcon />}
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastname}
              />
              <Input
                type="text"
                placeholder="Username"
                startIcon={<UserIcon />}
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
              />
              <Input
                type="email"
                placeholder="Email address"
                startIcon={<EmailIcon />}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
              />
              <div>
                <PhoneInput
                  country={"us"}
                  value={""}
                  onChange={(phone) => setFieldValue("phone", phone)}
                  inputClass={`!w-full !rounded-[9.77px] border ${
                    errors.phone ? "!border-red-500" : "!border-[#E9E9E9]"
                  } h-9 px-3 py-6 text-base shadow-sm transition-colors placeholder:text-[#A1A1A1] focus-visible:outline-none focus-visible:border-[#E9E9E9] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  buttonClass={`border ${errors.phone ? "!border-red-500" : "!border-[#E9E9E9]"}`}
                  specialLabel=""
                  enableAreaCodes={true}
                  enableSearch
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 min-h-[1rem]">{errors.phone}</p>
                )}
              </div>
              <SelectFilter
                list={[
                  { text: "Male", value: "male" },
                  { text: "Female", value: "female" },
                ]}
                setFilter={(val) => setFieldValue("gender", val)}
                name="gender"
                placeholder="Gender"
                className={`!w-full rounded-[9.77px] border ${
                  errors.gender ? "!border-red-500" : "!border-[#E9E9E9]"
                }  h-9 px-3 py-6 text-base shadow-sm transition-colors placeholder:text-[#A1A1A1] focus-visible:outline-none focus-visible:border-[#E9E9E9] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                error={errors.gender}
              />
            </div>

            <SelectFilter
              list={countries.map((country) => ({
                text: country.name,
                value: country.code,
              }))}
              setFilter={(val) => setFieldValue("country", val)}
              name="country"
              placeholder="Country"
              className={`!w-full rounded-[9.77px] border ${
                errors.country ? "!border-red-500" : "!border-[#E9E9E9]"
              }  h-9 px-3 py-6 text-base shadow-sm transition-colors placeholder:text-[#A1A1A1] focus-visible:outline-none focus-visible:border-[#E9E9E9] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
              error={errors.country}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                type="text"
                placeholder="State"
                startIcon={<UserIcon />}
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.state}
              />
              <Input
                type="text"
                placeholder="City"
                startIcon={<UserIcon />}
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city}
              />
            </div>
            <Input
              type="text"
              placeholder="Delivery address"
              startIcon={<AddressIcon />}
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                type={isTogglePassword.password ? "text" : "password"}
                placeholder="Password"
                startIcon={<PasswordIcon />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => toggleVisibility("password")}
                    className="focus:outline-none"
                  >
                    {isTogglePassword.password ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
              />
              <Input
                type={isTogglePassword.confirm_password ? "text" : "password"}
                placeholder="Confirm password"
                name="confirm_password"
                startIcon={<PasswordIcon />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => toggleVisibility("confirm_password")}
                    className="focus:outline-none"
                  >
                    {isTogglePassword.confirm_password ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                }
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirm_password}
              />
            </div>
            <Button
              variant={"default"}
              className="bg-[#222222] hover:bg-[#222222db] rounded-full py-6 mt-2 md:mt-4"
              type="submit"
              loading={isPending}
            >
              Create Account
            </Button>
            <p className="text-center pb-10 md:pb-0">
              Already have an account?{" "}
              <Link href={PATHS.LOGIN} className="text-blue-500">
                Log in
              </Link>
            </p>
          </form>
        </AuthForm>
      ) : (
        <div className="mx-auto flex w-full max-w-lg flex-col items-center px-5 py-8 text-center">
          <h1 className="text-2xl font-semibold text-[#222222]">Check your email</h1>
          <p className="mt-3 text-sm leading-6 text-[#737373]">
            A verification link has been sent to{" "}
            <span className="font-medium text-[#222222]">
              {emailFromUrl || submittedEmail.current}
            </span>
            . Please follow the link to confirm your email address.
          </p>
          <p className="mt-5 text-sm text-[#737373]" aria-live="polite">
            {secondsRemaining > 0
              ? `Didn’t receive the email? You can request another in ${secondsRemaining} seconds.`
              : "Didn’t receive the email?"}
          </p>
          {secondsRemaining === 0 && (
            <button
              type="button"
              onClick={handleResendConfirmationEmail}
              disabled={!emailFromUrl || isResendingEmail}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#007AFF] px-8 text-sm font-medium text-white hover:bg-[#0062cc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResendingEmail ? "Sending..." : "Resend confirmation email"}
            </button>
          )}
          <p className="mt-5 text-center pb-10 md:pb-0">
            Continue to{" "}
            <Link href={PATHS.LOGIN} className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

const Signup: FC = () => (
  <Suspense fallback={<div className="min-h-[50vh]" />}>
    <SignupForm />
  </Suspense>
);

export default Signup;
