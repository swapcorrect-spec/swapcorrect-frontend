import MomentAgo from "../moment-ago";
// import NewChat from "@/app/assets/images/svgs/New_chat.svg";
// import NewReview from "@/app/assets/images/svgs/New_review.svg";
// import NewSwap from "@/app/assets/images/svgs/new_swap.svg";
import OfferAccepted from "@/app/assets/images/svgs/Offer_accepted.svg";
// import OfferDeclined from "@/app/assets/images/svgs/Offer_declined.svg";
import { CircularProgress } from "../shared/circular-progress";

interface Notify {
  // read: boolean;
  // title: string;
  // description: string;
  // time: string;
  // type: string;
  id: string;
  title: string;
  message: string;
  type: string;
  referenceId: null | string;
  isRead: boolean;
  createdAt: string;
}

interface iProps {
  notify: Notify;
  onRead: (notification_id: string) => void;
  isPending?: boolean;
  selectedNotification: string;
}

const Notification: React.FC<iProps> = ({ notify, onRead, isPending, selectedNotification }) => {
  return (
    <div
      className={`${
        notify?.isRead ? "" : "bg-[#F9FCFF]"
      } py-3 px-2 flex gap-2 rounded-lg cursor-pointer`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full 
          ${
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
          }
        `}
      >
        {/* {notify?.type === "new-chat" ? (
          <NewChat />
        ) : notify?.type === "new-request" ? (
          <NewSwap />
        ) : notify?.type === "offer-accepted" ? (
          <OfferAccepted />
        ) : notify?.type === "offer-declined" ? (
          <OfferDeclined />
        ) : (
          <NewReview />
        )} */}
        <OfferAccepted />
      </div>
      <div className="flex-1">
        <p className="text-[#222222] font-medium text-base flex items-center gap-1 mb-[2px]">
          <span>{notify?.title}</span>
          {!notify?.isRead && <span className="w-[6px] h-[6px] rounded-full bg-[#007AFF]"></span>}
        </p>
        <p className="text-sm text-[#696969] mb-1 font-medium">{notify?.message}</p>
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-[#929292]">
            <MomentAgo createdAt={notify?.createdAt} />
          </p>
          {!notify.isRead && (
            <button
              onClick={() => onRead(notify.id)}
              className="text-xs text-blue-500 hover:underline"
              disabled={isPending}
            >
              {isPending && notify.id === selectedNotification ? (
                <CircularProgress color="blue" size={12} />
              ) : (
                "Mark as read"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
