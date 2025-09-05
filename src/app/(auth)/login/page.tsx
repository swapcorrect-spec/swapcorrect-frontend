"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";

import AuthForm from "@/components/shared/AuthForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import EmailIcon from "@/app/assets/images/svgs/Email.svg";
import PasswordIcon from "@/app/assets/images/svgs/Password.svg";
import EyeClosedIcon from "@/app/assets/images/svgs/Eye_Closed.svg";
import EyeOpenIcon from "@/app/assets/images/svgs/Eye_Open.svg";
// import GoogleIcon from "@/app/assets/images/svgs/GoogleIcon.svg";

import { PATHS } from "@/app/_constants/paths";

import { loginPayload, validationSchema } from "@/app/(auth)/login/_validation";

import { useLogin } from "@/app/_hooks/queries/auth/auth";

const Login: FC = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const { mutate, isPending } = useLogin({
    onSuccess(_val: { displayMessage: string; result: { jwt: string } }) {
      toast.success(_val.displayMessage, {
        onAutoClose: () => {
          localStorage.setItem("comms-access-token", _val.result.jwt);
          router.push(`${PATHS.DASHBOARD}`);
        },
      });
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const handleLogin = (data: loginPayload) => {
    mutate({
      payload: {
        email: data.email,
        password: data.password,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validateOnBlur: false,
    validationSchema,
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = formik;

  return (
    <AuthForm title="Welcome Back, Swapper!" subtitle="Log in to continue your swap journey.">
      {/* <Button variant={"secondary"} className="w-full py-6 border-[#EEEEEE] border text-[#000000] font-medium text-lg">
        <GoogleIcon style={{ width: "30px", height: "30px" }} /> Continue with Google
      </Button> */}
      <div className="flex items-center justify-center w-full my-8">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
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
        <div>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            startIcon={<PasswordIcon />}
            endIcon={
              <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            }
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
          />
          <div className="flex justify-end pt-2">
            <Link href={PATHS.FORGOT_PASSWORD} className="text-[#898989] text-xs w-fit">
              Forgot Password
            </Link>
          </div>
        </div>
        <Button variant={"default"} className="rounded-full py-6 mt-2 md:mt-4" type="submit" loading={isPending}>
          Sign In
        </Button>
        <p className="text-center pb-10 md:pb-0">
          Don&apos;t have an account?{" "}
          <Link href={PATHS.SIGNUP} className="text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </AuthForm>
  );
};

export default Login;
