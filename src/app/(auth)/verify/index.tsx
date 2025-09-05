"use client";

import { PATHS } from "@/app/_constants/paths";
import { useVerifyEmail } from "@/app/_hooks/queries/auth/auth";
import { CircularProgress } from "@/components/shared/circular-progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  searchParams: {
    email: string;
    token: string;
  };
};

const VerifyClient = ({ searchParams }: Props) => {
  const router = useRouter();
  const { isPending, isSuccess, mutate, isError } = useVerifyEmail({
    onSuccess() {},
    onError() {},
  });

  const token = searchParams.token;
  const email = searchParams.email;

  useEffect(() => {
    if (token && email) {
      mutate({
        payload: {
          email,
          token,
        },
      });
    }
  }, [email, token]);

  if (isPending) {
    return (
      <div className="text-center flex flex-col justify-center items-center">
        <CircularProgress color="black" size={40} />
        <p>Please wait...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center flex flex-col justify-center items-center">
        <p>An error occurred while verying email address</p>
        <Button
          variant="default"
          className="rounded-full py-6 mt-2 md:mt-4"
          onClick={() => {
            // TODO: Add resend functionality here
          }}
        >
          Resend Verification Link
        </Button>
      </div>
    );
  }

  const handleLogin = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  return (
    <div>
      {isSuccess && (
        <div className="text-center flex flex-col items-center justify-center">
          <p>Email Address Verified</p>
          <Button variant="default" className="rounded-full py-6 mt-2 md:mt-4" onClick={handleLogin}>
            Proceed to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyClient;
