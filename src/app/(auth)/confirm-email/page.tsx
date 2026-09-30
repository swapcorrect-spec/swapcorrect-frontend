"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useConfirmEmail } from "@/app/_hooks/queries/auth/auth";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const { mutate: resendConfirmation, isPending } = useConfirmEmail({
    onSuccess() {
      toast.success("A new confirmation email has been sent.");
      setSecondsRemaining(60);
    },
    onError(error) {
      toast.error(error);
    },
  });

  useEffect(() => {
    if (secondsRemaining === 0) return;

    const countdown = window.setInterval(() => {
      setSecondsRemaining((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [secondsRemaining]);

  const handleResend = () => {
    if (!email || isPending) return;
    resendConfirmation({ payload: { email } });
  };

  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col items-center justify-center px-5 py-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#007AFF]/10 text-[#007AFF]">
        <MailCheck className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-semibold text-[#222222]">Confirm your email</h1>
      <p className="mt-3 text-sm leading-6 text-[#555555]">
        Please confirm your email address before logging in. We’ve sent a confirmation link
        {email ? (
          <>
            {" to "}
            <span className="font-medium text-[#222222]">{email}</span>
          </>
        ) : null}
        . Check your inbox and follow the link to activate your account.
      </p>
      <p className="mt-5 text-sm text-[#737373]" aria-live="polite">
        {secondsRemaining > 0
          ? `You can request another email in ${secondsRemaining} seconds.`
          : "Didn’t receive the email?"}
      </p>
      {secondsRemaining === 0 && (
        <button
          type="button"
          onClick={handleResend}
          disabled={!email || isPending}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#007AFF] px-8 text-sm font-medium text-white hover:bg-[#0062cc] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Resend confirmation email"}
        </button>
      )}
      <Link href="/login" className="mt-5 text-sm font-medium text-[#007AFF] hover:underline">
        Back to Login
      </Link>
    </main>
  );
}
