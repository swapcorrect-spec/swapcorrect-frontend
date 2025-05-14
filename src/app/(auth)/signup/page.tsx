import { FC } from "react";
import Link from "next/link";

import { PATHS } from "@/app/_constants/paths";

import AuthForm from "@/components/shared/AuthForm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import UserIcon from "@/app/assets/images/User.svg";
import EmailIcon from "@/app/assets/images/Email.svg";
import PhoneIcon from "@/app/assets/images/Phone.svg";
import AddressIcon from "@/app/assets/images/Address.svg";
import PasswordIcon from "@/app/assets/images/Password.svg";
import EyeClosedIcon from "@/app/assets/images/Eye_Closed.svg";

const Signup: FC = () => {
  return (
    <AuthForm
      title="Welcome to SwapShop!"
      subtitle="Create your free account and start swapping instantly."
    >
      <form className="flex flex-col gap-6">
        <Input type="text" placeholder="Fullname" startIcon={<UserIcon />} />
        <Input
          type="email"
          placeholder="Email address"
          startIcon={<EmailIcon />}
        />
        <Input
          type="tel"
          placeholder="Phone number"
          startIcon={<PhoneIcon />}
        />
        <Input
          type="text"
          placeholder="Delivery address"
          startIcon={<AddressIcon />}
        />
        <Input
          type="password"
          placeholder="Password"
          startIcon={<PasswordIcon />}
          endIcon={<EyeClosedIcon />}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          startIcon={<PasswordIcon />}
        />
        <Button variant={"default"} className="rounded-full py-6 mt-2 md:mt-4">
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
