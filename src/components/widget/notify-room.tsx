import MomentAgo from "@/components/moment-ago";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import { useState } from "react";
import { FileImage, FileVideo, File } from "lucide-react";

interface iChatRoom {
  count?: number;
  sendAt: string;
  message: string;
  userImgUrl: string;
  fullName: string;
  isText?: boolean;
  fileUrl?: Record<string, string>[];
  userStatus?: "Online" | "Offline";
  userId?: string;
  chatRoomName?: string;
}

interface iProps {
  showIcon?: boolean;
  chat: iChatRoom;
}

// Helper function to format message preview
const formatMessagePreview = (message: string): { text: string; icon?: JSX.Element } => {
  // Check if it's a Cloudinary URL
  if (message.includes('res.cloudinary.com')) {
    if (message.includes('/image/') || message.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return { text: "Image", icon: <FileImage size={14} className="inline mr-1" /> };
    } else if (message.includes('/video/') || message.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
      return { text: "Video", icon: <FileVideo size={14} className="inline mr-1" /> };
    } else if (message.includes('/raw/')) {
      return { text: "Document", icon: <File size={14} className="inline mr-1" /> };
    }
  }
  
  // For text messages, truncate if too long
  if (message.length > 30) {
    return { text: message.substring(0, 30) + "..." };
  }
  
  return { text: message };
};

const NotificationMessageCard: React.FC<iProps> = ({ chat }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imageError, setImageError] = useState(false);

  const handleChatClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('roomName', chat.chatRoomName || '');
    router.push(`?${params.toString()}`);
  };

  const imageSrc = getImageSrcWithFallback(chat.userImgUrl, imageError);
  const messagePreview = formatMessagePreview(chat.message);

  return (
    <div 
      className="hover:bg-[#F9F9F9] border-b-[0.8px] border-[#0E0E0E0D] p-3 flex gap-[10px] items-center cursor-pointer"
      onClick={handleChatClick}
    >
      <div className="w-12 h-14 rounded-full">
        <Image
          src={imageSrc}
          height={40}
          width={40}
          alt="User profile"
          className="w-10 h-10 rounded-full"
          onError={createImageErrorHandler(setImageError)}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[#222222] font-medium text-lg mb-1">
            {chat.fullName}
          </p>
          
          {chat.userStatus?.toLowerCase() !== "offline" && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </div>
        <p className="text-sm text-[#666666] truncate">
          {messagePreview.icon}
          {messagePreview.text}
        </p>
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
