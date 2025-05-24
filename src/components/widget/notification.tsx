import MomentAgo from "../moment-ago";
import NewChat from "@/app/assets/images/New_chat.svg";
import NewReview from "@/app/assets/images/New_review.svg";
import NewSwap from "@/app/assets/images/new_swap.svg";
import OfferAccepted from "@/app/assets/images/Offer_accepted.svg";
import OfferDeclined from "@/app/assets/images/Offer_declined.svg";

interface Notify {
  read: boolean;
  title: string;
  description: string;
  time: string;
  type: string;
}

interface iProps {
  notify: Notify;
}

const Notification: React.FC<iProps> = ({ notify }) => {
  return (
    <div
      className={`${
        notify?.read ? "" : "bg-[#F9FCFF]"
      } py-3 px-2 flex gap-2 rounded-lg cursor-pointer`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          notify?.type === "new-chat"
            ? "bg-[#F3F0FF]"
            : notify?.type === "new-request"
            ? "bg-[#EAF4FF]"
            : notify?.type === "offer-accepted"
            ? "bg-[#EEFFEB]"
            : notify?.type === "offer-declined"
            ? "bg-[#FFEFEF]"
            : notify?.type === "new-review"
            ? "bg-[#FFFAEA]"
            : ""
        }`}
      >
        {notify?.type === "new-chat" ? (
          <NewChat />
        ) : notify?.type === "new-request" ? (
          <NewSwap />
        ) : notify?.type === "offer-accepted" ? (
          <OfferAccepted />
        ) : notify?.type === "offer-declined" ? (
          <OfferDeclined />
        ) : (
          <NewReview />
        )}
      </div>
      <div className="flex-1">
        <p className="text-[#222222] font-medium text-base flex items-center gap-1 mb-[2px]">
          <span>{notify?.title}</span>
          {!notify?.read && (
            <span className="w-[6px] h-[6px] rounded-full bg-[#007AFF]"></span>
          )}
        </p>
        <p className="text-sm text-[#696969] mb-1 font-medium">
          {notify?.description}
        </p>
        <p className="text-[10px] text-[#929292]">
          <MomentAgo createdAt={notify?.time} />
        </p>
      </div>
    </div>
  );
};

export default Notification;
