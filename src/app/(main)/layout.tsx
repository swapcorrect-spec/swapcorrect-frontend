"use client";

import { redirect } from "next/navigation";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import { PATHS } from "../_constants/paths";
import { useGetUserInfo, useUpdateRole } from "../_hooks/queries/auth/auth";
import { Auth } from "../_config/auth";
import { CircularProgress } from "@/components/shared/circular-progress";
import useIsMobile from "../_hooks/useIsMobile";
import MobileNavbar from "@/components/shared/mobile-navbar";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ConfirmModal = ({
  handleToggleSwapperUpgrade,
}: {
  handleToggleSwapperUpgrade: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useUpdateRole({
    onSuccess(_val: { result: string }) {
      handleToggleSwapperUpgrade();
      queryClient.invalidateQueries({ queryKey: ["useGetUserInfo"] });
      toast.success(_val.result, {
        onAutoClose: () => {},
      });
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const handleUpgradeRole = () => {
    mutate({
      payload: {
        role: "Swapper",
      },
    });
  };

  return (
    <section>
      <h6 className="text-[#222222] font-medium text-xl mb-3 text-center">Upgrade to Swapper</h6>
      <p className="text-[#737373] text-sm text-center mb-5">
        Note: Upgrading to swapper enables you to list your items.
      </p>

      <div className="flex gap-4 mt-10">
        <Button
          className="!h-10 rounded-xl font-medium w-full bg-white text-black border border-black hover:bg-white hover:border-black"
          onClick={handleToggleSwapperUpgrade}
        >
          Cancel
        </Button>
        <Button
          className="!h-10 rounded-xl font-medium w-full"
          onClick={handleUpgradeRole}
          disabled={isPending}
          loading={isPending}
        >
          Upgrade
        </Button>
      </div>
    </section>
  );
};

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isFetching, data } = useGetUserInfo({ enabler: true });
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [isToggleUpgrade, setIsToggleUpgrade] = useState(false);

  const isAuthenticated = Auth.isAuthenticated();

  // const user_role =
  //   Auth.getDecodedJwt()["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleSwapperUpgrade = () => {
    setIsToggleUpgrade(!isToggleUpgrade);
  };

  if (isFetching) {
    return (
      <div className="text-center mt-4 flex flex-col items-center justify-center">
        <CircularProgress color="#007AFF" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect(`/${PATHS.LOGIN}`);
  }

  return (
    <>
      <section className={cn("flex w-full")}>
        {isOpen && isAuthenticated && !isMobile && (
          <Sidebar
            handleToggleMenu={handleToggleMenu}
            role={data?.result.userRole[0] as "Visitor" | "Swapper"}
          />
        )}
        <section className="flex-1 h-screen overflow-y-auto">
          {isMobile ? (
            <MobileNavbar
              data={data}
              role={data?.result.userRole[0] as "Visitor" | "Swapper"}
              handleToggleSwapperUpgrade={handleToggleSwapperUpgrade}
            />
          ) : (
            <Navbar
              data={data}
              handleToggleMenu={handleToggleMenu}
              isOpen={isOpen}
              role={data?.result.userRole[0] as "Visitor" | "Swapper"}
              handleToggleSwapperUpgrade={handleToggleSwapperUpgrade}
            />
          )}
          {children}
        </section>
      </section>
      <Dialog open={isToggleUpgrade}>
        <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-99999" />

        <DialogContent
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
               max-w-md w-full p-6 rounded-xl bg-white shadow-lg"
        >
          <ConfirmModal handleToggleSwapperUpgrade={handleToggleSwapperUpgrade} />
        </DialogContent>
      </Dialog>
    </>
  );
}
