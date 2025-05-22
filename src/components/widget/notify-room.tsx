import MomentAgo from "@/components/moment-ago";
import Image from "next/image";

interface iChatRoom {
  count?: number;
  sendAt: string;
  message: string;
  userImgUrl: string;
  fullName: string;
  isText?: boolean;
  fileUrl?: Record<string, string>[];
}

interface iProps {
  showIcon?: boolean;
  chat: iChatRoom;
}

const NotificationMessageCard: React.FC<iProps> = ({ chat }) => {
  return (
    <div className="hover:bg-[#F9F9F9] border-b-[0.8px] border-[#0E0E0E0D] p-3 flex gap-[10px] items-center cursor-pointer">
      <div className="w-12 h-14 rounded-full">
        <Image
          src={chat.userImgUrl || ""}
          height={40}
          width={40}
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <p className="text-[#222222] font-medium text-lg mb-1">
          {chat.fullName}
        </p>
        <p className="text-sm text-[#222222]">{chat.message}</p>
      </div>
      <div>
        <p className="mb-1 text-xs text-[#A1A1A1]">
          <MomentAgo createdAt={chat?.sendAt} />
        </p>
        {chat.count && (
          <div className="flex justify-end">
            <p className="w-4 h-4 rounded-full text-white bg-[#E42222] font-[350] flex items-center justify-center text-[10px]">
              {chat.count}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationMessageCard;
