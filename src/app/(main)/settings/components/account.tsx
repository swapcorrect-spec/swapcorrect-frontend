"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUser } from "@/app/_hooks/queries/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";

const Account: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };
  const { mutate, isPending } = useDeleteUser({
    onSuccess: (_val: { result: string }) => {
      setIsOpen(false);
      toast.success(_val.result, {
        onAutoClose: () => {
          router.push(`${PATHS.LOGIN}`);
        },
      });
      // Invalidate search query to refetch listings
      // queryClient.invalidateQueries({ queryKey: [SEARCH_ITEMS] });
    },
  });

  const handleDeleteUser = () => {
    mutate({ payload: {} });
  };
  return (
    <div>
      <h6 className="text-[#222222] font-medium text-xl">Log Out & Account Actions</h6>
      <p className="text-sm text-[#737373] mb-8">Manage your account access and status.</p>
      {/* <div className="bg-[#FFF4F4] py-5 px-4 flex gap-3 mb-4">
        <div className="flex-1">
          <h6 className="text-[#E42222] font-medium text-base">Account Deactivation</h6>
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
      </div> */}
      <div className="bg-[#FFF4F4] py-5 px-4 flex gap-3 mb-4">
        <div className="flex-1">
          <h6 className="text-[#E42222] font-medium text-base">Delete Account</h6>
          <p className="text-sm text-[#737373]">
            Permanently delete your account and all associated data. This action cannot be
            undone.{" "}
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
        <DialogContent className="left-[50%] max-w-[500px] translate-x-[-50%] overflow--y-scrollp-5">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>Are you sure you want to delete this Account?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
