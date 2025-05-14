import { FC } from "react";
import Link from "next/link";

import AuthForm from "@/components/shared/AuthForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import EmailIcon from "@/app/assets/images/Email.svg";
import PasswordIcon from "@/app/assets/images/Password.svg";
import EyeClosedIcon from "@/app/assets/images/Eye_Closed.svg";
import GoogleIcon from "@/app/assets/images/GoogleIcon.svg";

import { PATHS } from "@/app/_constants/paths";

const Login: FC = () => {
  return (
    <AuthForm
      title="Welcome Back, Swapper!"
      subtitle="Log in to continue your swap journey."
    >
      <Button
        variant={"secondary"}
        className="w-full py-6 border-[#EEEEEE] border text-[#000000] font-medium text-lg"
      >
        <GoogleIcon style={{ width: "30px", height: "30px" }} /> Continue with
        Google
      </Button>
      <div className="flex items-center justify-center w-full my-8">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>
      <form className="flex flex-col gap-6 mt-4">
        <Input
          type="email"
          placeholder="Email address"
          startIcon={<EmailIcon />}
        />
        <div>
          <Input
            type="password"
            placeholder="Password"
            startIcon={<PasswordIcon />}
            endIcon={<EyeClosedIcon />}
          />
          <Link
            href={PATHS.FORGOT_PASSWORD}
            className="flex justify-end text-[#898989] text-xs pt-2"
          >
            Forgot Password
          </Link>
        </div>
        <Button variant={"default"} className="rounded-full py-6 mt-2 md:mt-4">
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
