"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { PATHS } from "@/app/_constants/paths";

import AuthForm from "@/components/shared/AuthForm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import UserIcon from "@/app/assets/images/svgs/User.svg";
import EmailIcon from "@/app/assets/images/svgs/Email.svg";
import PhoneIcon from "@/app/assets/images/svgs/Phone.svg";
import AddressIcon from "@/app/assets/images/svgs/Address.svg";
import PasswordIcon from "@/app/assets/images/svgs/Password.svg";
import EyeClosedIcon from "@/app/assets/images/svgs/Eye_Closed.svg";
import {
  signupPayload,
  validationSchema,
} from "@/app/(auth)/signup/_validation";

const Signup: FC = () => {
  const router = useRouter();

  const handleLogin = (data: signupPayload) => {
    localStorage.setItem("user", JSON.stringify(data));
    router.push(`${PATHS.DASHBOARD}`);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = formik;
  return (
    <AuthForm
      title="Welcome to SwapShop!"
      subtitle="Create your free account and start swapping instantly."
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Fullname"
          startIcon={<UserIcon />}
          name="fullname"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullname}
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
        <Input
          type="tel"
          placeholder="Phone number"
          startIcon={<PhoneIcon />}
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />
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
        <Input
          type="password"
          placeholder="Password"
          startIcon={<PasswordIcon />}
          endIcon={<EyeClosedIcon />}
          name="password"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          startIcon={<PasswordIcon />}
        />
        <Button
          variant={"default"}
          className="rounded-full py-6 mt-2 md:mt-4"
          onClick={() => handleSubmit()}
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
  );
};

export default Signup;
