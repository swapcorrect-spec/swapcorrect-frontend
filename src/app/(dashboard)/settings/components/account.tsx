"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Account: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">
        Log Out & Account Actions
      </h6>
      <p className="text-sm text-[#737373] mb-8">
        Manage your account access and status.
      </p>
      <div className="bg-[#FFF4F4] py-5 px-4 flex gap-3 mb-4">
        <div className="flex-1">
          <h6 className="text-[#E42222] font-medium text-base">
            Account Deactivation
          </h6>
          <p className="text-sm text-[#737373]">
            Temporarily disable your account. You can reactivate it anytime.
          </p>
        </div>
        <Button
          className="border border-[#FFADAD] rounded-md bg-[#FFFFFF] text-[#E42222]"
          variant={"outline"}
          onClick={onOpenChange}
        >
          Deactivate
        </Button>
      </div>
      <div className="bg-[#FFF4F4] py-5 px-4 flex gap-3 mb-4">
        <div className="flex-1">
          <h6 className="text-[#E42222] font-medium text-base">
            Delete Account
          </h6>
          <p className="text-sm text-[#737373]">
            Permanently delete your account and all associated data. This action
            cannot be undone.{" "}
          </p>
        </div>
        <Button
          className="rounded-md bg-[#FFFFFF] bg-[#E42222] text-white flex items-center gap-2"
          onClick={onOpenChange}
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="left-[50%] max-w-[500px] translate-x-[-50%] overflow--y-scrollp-5"></DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
