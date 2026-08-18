"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useLogout } from "@/app/_hooks/queries/auth/auth";
import { ILogoutResponse } from "@/app/_hooks/queries/auth/auth.type";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal: FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutateAsync: logout } = useLogout({
    onSuccess() {},
    onError() {},
  });

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const response = (await logout()) as ILogoutResponse;
      toast.success(response?.result || response?.displayMessage || "Logged out successfully");
      onConfirm();
    } catch {
      toast.error("Failed to log out. Clearing your session anyway.");
      onConfirm();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoggingOut) onClose();
      }}
    >
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl">
        <div className="p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-3">
              <LogOut size={22} className="text-[#E42222]" />
            </div>
            <DialogTitle className="text-[#222222] text-xl font-medium">Log out</DialogTitle>
            <DialogDescription className="text-[#737373] text-sm mt-2">
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={onClose}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-xl bg-[#E42222] hover:bg-[#CC1E1E] text-white gap-2"
              onClick={handleLogout}
              loading={isLoggingOut}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmModal;
