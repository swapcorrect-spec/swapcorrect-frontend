"use client";

import { FC } from "react";
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

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal: FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            <Button variant="outline" className="rounded-xl" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-[#E42222] hover:bg-[#CC1E1E] text-white gap-2"
              onClick={onConfirm}
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
