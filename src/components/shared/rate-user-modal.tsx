"use client";

import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useAddReview } from "@/app/_hooks/queries/review/review";
import { useQueryClient } from "@tanstack/react-query";

type RateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  raterId: string;
  userId: string;
  userName?: string;
};

const RateUserModal: FC<RateUserModalProps> = ({
  isOpen,
  onClose,
  raterId,
  userId,
  userName,
}) => {
  const queryClient = useQueryClient();
  const [rateScore, setRateScore] = useState(0);
  const [hoveredScore, setHoveredScore] = useState(0);
  const [description, setDescription] = useState("");

  const { mutate: addReview, isPending } = useAddReview({
    onSuccess(val: { displayMessage?: string; result?: string | null }) {
      toast.success(val?.displayMessage || val?.result || "Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["useGetUserReviews", userId] });
      onClose();
    },
    onError(err) {
      toast.error(err || "Failed to submit review. Please try again.");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setRateScore(0);
      setHoveredScore(0);
      setDescription("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!raterId || !userId) {
      toast.error("Unable to submit review. Missing user information.");
      return;
    }
    if (rateScore < 1) {
      toast.error("Please select a rating");
      return;
    }
    if (!description.trim() || description.trim().length < 5) {
      toast.error("Please write a short review (at least 5 characters)");
      return;
    }

    addReview({
      payload: {
        dto: {
          raterId,
          userId,
          description: description.trim(),
          rateScore,
        },
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="left-[50%] max-w-[420px] translate-x-[-50%] p-0 overflow-hidden rounded-2xl">
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-[#222222]">Rate User</h2>
            <p className="text-sm text-[#737373] mt-1">
              {userName
                ? `Share your experience with ${userName}.`
                : "Share your experience with this user."}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Rating</label>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const score = index + 1;
                const active = (hoveredScore || rateScore) >= score;
                return (
                  <button
                    key={score}
                    type="button"
                    aria-label={`Rate ${score} star${score > 1 ? "s" : ""}`}
                    className="p-0.5 transition-transform hover:scale-110"
                    onMouseEnter={() => setHoveredScore(score)}
                    onMouseLeave={() => setHoveredScore(0)}
                    onClick={() => setRateScore(score)}
                  >
                    <Star
                      size={28}
                      className={active ? "fill-[#F5A524] text-[#F5A524]" : "text-[#D1D5DB]"}
                    />
                  </button>
                );
              })}
              {rateScore > 0 && (
                <span className="text-sm text-[#737373] ml-1">{rateScore}/5</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222222]">Review</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was your experience like?"
              className="w-full border border-[#E9E9E9] rounded-xl p-3 min-h-[110px] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-[#222222] hover:bg-black"
              onClick={handleSubmit}
              disabled={isPending}
              loading={isPending}
            >
              {isPending ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RateUserModal;
