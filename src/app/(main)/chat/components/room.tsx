import EmptyMessageRoom from "./empty-room";
import Image from "next/image";
import {
  Send,
  Check,
  CheckCheck,
  Plus,
  X,
  File,
  FileVideo,
  Info,
  FileImage,
  ArrowLeft,
  EllipsisVertical,
} from "lucide-react";
import { useState, useEffect, useRef, SetStateAction, Dispatch, useMemo } from "react";
import SwapModalContent from "./swap-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCloseSwap } from "@/app/_hooks/queries/swap/swap";
import Smiley from "@/app/assets/images/svgs/smiley.svg";
import { useGetChatRoomMessages } from "@/app/_hooks/queries/chat/chat";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { useSearchParams } from "next/navigation";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import * as signalR from "@microsoft/signalr";
import { IRoomMessage } from "@/app/_hooks/queries/chat/chat.type";
import EmojiPicker from "emoji-picker-react";
import ReactPlayer from "react-player";
import useIsMobile from "@/app/_hooks/useIsMobile";
import { useQueryClient } from "@tanstack/react-query";
import { useInitializePayment } from "@/app/_hooks/queries/payment/payment";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import Link from "next/link";
import { useSwitchSwapStatus } from "@/app/_hooks/queries/listing/listing";

type ChatListProps = IRoomMessage;

interface MessageRoomProps {
  userName: string;
  userProfileUrl: string;
  userId: string;
  setIsShowChat: Dispatch<SetStateAction<boolean>>;
}

const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
};

// Helper function to format date separator (Sat, Jun 28)
const formatDateSeparator = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if today
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    // Check if yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    // Otherwise show day and date
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

// Helper function to check if two dates are on different days
const isDifferentDay = (date1: string, date2: string) => {
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() !== d2.toDateString();
  } catch {
    return false;
  }
};

// Helper function to get file type from file
const getFileType = (file: File): "Image" | "Video" | "File" => {
  const type = file.type.toLowerCase();
  if (type.startsWith("image/")) return "Image";
  if (type.startsWith("video/")) return "Video";
  return "File";
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

// Component for rendering message status indicator
const MessageStatusIndicator = ({ status }: { status: string }) => {
  if (status === "Read") {
    return <CheckCheck size={14} className="inline" />;
  } else if (status === "Sent" || status === "Unread") {
    return <Check size={14} className="inline" />;
  }
  return null;
};

const SwapStatus = {
  Negotiation: "Negotiation",
  Resolution: "Resolution",
  Swapped: "Swapped",
  Closed: "Closed",
  AwaitingConfirmation: "Awaiting Confirmation",
  RequestAdvNegotiation: "Request Advance Negotiation",
  AdvanceChargePaymentCompleted: "Advance Charge Payment Completed",
  AwaitingVendorHoldingFee: "Awaiting Vendor Holding Fee",
  AdvNegotiation: "Advance Negotiation",
  AdvNegotiationSwapped: "Advance Negotiation Swapped",
};

const MessageRoom: React.FC<MessageRoomProps> = ({
  userName,
  userProfileUrl,
  userId,
  setIsShowChat,
}) => {
  const isMobile = useIsMobile();

  const [modalType, setModalType] = useState<
    "swap" | "closeSwap" | "viewImage" | "infoDrawer" | null
  >(null);
  const [swapType, setSwapType] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<ChatListProps[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<number>>(new Set());
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [loadingMedia, setLoadingMedia] = useState<Set<number>>(new Set()); // Track media loading state
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const roomName = searchParams.get("roomName") || "";

  const { data: currentUserData } = useGetUserInfo({
    enabler: true,
  });

  const currentUserId = currentUserData?.result?.id || "";

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchRoomMessages,
  } = useGetChatRoomMessages({
    roomName,
    enabler: !!roomName,
  });

  const { mutate, isPending } = useInitializePayment({
    onSuccess(_val: { result: { data: { authorization_url: string } } }) {
      const redirect_url = _val?.result?.data?.authorization_url;
      window.open(redirect_url, "_blank", "noopener,noreferrer");
    },
    onError(_err) {
      toast.error(_err);
    },
  });
  const { mutate: mutateSwitchSwapStatus, isPending: isPendingSwitchSwap } = useSwitchSwapStatus({
    onSuccess(_val: { displayMessage: string }) {
      toast.success(_val.displayMessage);
      queryClient.invalidateQueries({ queryKey: ["useGetActiveChatUsers"] });
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  const swappingProceeding = data?.result?.swappingProceeding;
  const swapId = swappingProceeding?.id;
  const isSwapper = data?.result?.isSwapper;

  const { closeSwap, isPending: isClosingSwap } = useCloseSwap({
    onSuccess: () => {
      setModalType(null);
      // Optionally refetch chat room messages
      refetchRoomMessages();
    },
  });

  // Sync GET request data with messages state
  // Only update if we don't have messages or if this is initial load
  useEffect(() => {
    if (data?.result?.roomMessages && Array.isArray(data.result.roomMessages)) {
      setMessages((prev) => {
        // If we already have messages (from SignalR), merge them intelligently
        if (prev.length > 0) {
          // Create a map of existing messages by unique key
          const existingMessagesMap = new Map(
            prev.map((msg) => [`${msg.message}-${msg.dateTime}-${msg.senderId}`, msg])
          );

          // Add new messages from API that don't exist yet
          const apiMessages = [...data.result.roomMessages].reverse();
          apiMessages.forEach((msg) => {
            const key = `${msg.message}-${msg.dateTime}-${msg.senderId}`;
            if (!existingMessagesMap.has(key)) {
              existingMessagesMap.set(key, msg);
            }
          });

          // Convert back to array and sort by dateTime
          return Array.from(existingMessagesMap.values()).sort(
            (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
        }

        // Initial load - just reverse the API messages
        return [...data.result.roomMessages].reverse();
      });
    }
  }, [data]);

  const profileImageSrc = getImageSrcWithFallback(userProfileUrl, imageError);

  // Use messages state instead of hardcoded chatList
  const chatList = messages;

  // Get media counts from API (more efficient than manual calculation)
  const mediaStats = {
    images: data?.result?.imageCount || 0,
    videos: data?.result?.videoCount || 0,
    files: data?.result?.fileCount || 0,
  };

  // Get all media messages for the grid display
  const allMedia = messages.filter(
    (msg) =>
      msg.messageType === "Image" || msg.messageType === "Video" || msg.messageType === "File"
  );

  // SignalR Connection Setup
  useEffect(() => {
    const hubUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/chathub";

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    // Track connection status
    newConnection.onclose(() => {
      setConnectionStatus("Disconnected");
    });

    newConnection.onreconnecting(() => {
      setConnectionStatus("Reconnecting");
    });

    newConnection.onreconnected(() => {
      setConnectionStatus("Connected");
    });

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (!connection || !roomName || !currentUserId) return;

    const setupSignalR = async () => {
      try {
        // Start connection if not already connected
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          setConnectionStatus("Connecting");
          await connection.start();
          setConnectionStatus("Connected");
        }

        // Join the room (safe to call multiple times)
        await connection.invoke("JoinRoom", roomName, currentUserId);

        // Register handler - remove old handler first to prevent duplicates
        connection.off("ReceiveMessage");
        connection.on("ReceiveMessage", (message) => {
          if (typeof message === "string") {
            console.warn("Received string instead of message object, ignoring:", message);
            return;
          }

          const normalizeMessageType = (type: string): "Text" | "Image" | "Video" | "File" => {
            const lowerType = (type || "text").toLowerCase();
            const typeMap: Record<string, "Text" | "Image" | "Video" | "File"> = {
              text: "Text",
              image: "Image",
              video: "Video",
              file: "File",
            };
            return typeMap[lowerType] || "Text";
          };

          // Transform message to match IRoomMessage format
          const transformedMessage: IRoomMessage = {
            message: message.message || message.content || "",
            dateTime:
              message.dateTime || message.time || message.timestamp || new Date().toISOString(),
            status: message.status || "Sent",
            messageType: normalizeMessageType(message.messageType),
            senderImgUrl: message.senderImgUrl || null,
            senderId: message.senderId || message.userId || "unknown",
            isMe: message.isMe !== undefined ? message.isMe : message.senderId === currentUserId,
          };

          setMessages((prev) => {
            // Check if message already exists to prevent duplicates
            const messageExists = prev.some(
              (msg) =>
                msg.message === transformedMessage.message &&
                msg.dateTime === transformedMessage.dateTime &&
                msg.senderId === transformedMessage.senderId
            );
            if (messageExists) {
              return prev;
            }

            const newMessages = [...prev, transformedMessage];
            // Mark as loading if it's media content
            if (
              transformedMessage.messageType === "Image" ||
              transformedMessage.messageType === "Video"
            ) {
              setLoadingMedia((prevLoading) => new Set(prevLoading).add(newMessages.length - 1));
            }
            return newMessages;
          });

          // Invalidate sidebar query to update chat list
          queryClient.invalidateQueries({ queryKey: ["useGetActiveChatUsers"] });
        });
      } catch (error) {
        console.error("Error setting up SignalR:", error);
        setConnectionStatus("Error");
      }
    };

    setupSignalR();
  }, [connection, roomName, currentUserId, queryClient]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const sendMessage = async (message: string, messageType: string = "Text") => {
    if (connection && roomName && currentUserId) {
      try {
        await connection.invoke("SendMessageToRoom", roomName, currentUserId, message, messageType);

        queryClient.invalidateQueries({ queryKey: ["useGetActiveChatUsers"] });
        refetchRoomMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles((prev) => [...prev, ...fileArray]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all selected files
  const clearAllFiles = () => {
    setSelectedFiles([]);
    setUploadingFiles(new Set());
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File, fileIndex: number) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error("Cloudinary credentials not found!");
      return null;
    }

    // Determine resource type
    let resourceType = "auto";
    if (file.type.startsWith("image/")) {
      resourceType = "image";
    } else if (file.type.startsWith("video/")) {
      resourceType = "video";
    } else {
      resourceType = "raw";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "swap_shop/chat");

    try {
      setUploadingFiles((prev) => new Set(prev).add(fileIndex));

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setUploadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileIndex);
        return newSet;
      });

      return data;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      setUploadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileIndex);
        return newSet;
      });
      return null;
    }
  };

  // Handle send with file uploads
  const handleSendWithFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    // For now, just test with the first file
    const file = selectedFiles[0];
    const fileType = getFileType(file);

    // 1. Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, 0);

    if (!uploadResult) {
      console.error("Upload failed!");
      setIsUploading(false);
      return;
    }

    // 2. Add message optimistically to chat with "Sending" status
    const optimisticMessage: IRoomMessage = {
      message: uploadResult.secure_url,
      dateTime: new Date().toISOString(),
      status: "Sending", // Custom status to show spinner
      messageType: fileType,
      senderImgUrl: currentUserData?.result?.profilePicture || null,
      senderId: currentUserId,
      isMe: true,
    };

    setMessages((prev) => {
      const newMessages = [...prev, optimisticMessage];
      // Mark this message as loading media
      setLoadingMedia((prevLoading) => new Set(prevLoading).add(newMessages.length - 1));
      return newMessages;
    });

    // 3. Send via SignalR
    try {
      await sendMessage(uploadResult.secure_url, fileType);

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.status === "Sending" ? { ...msg, status: "Sent" } : msg
        )
      );

      queryClient.invalidateQueries({ queryKey: ["useGetActiveChatUsers"] });
      refetchRoomMessages();

      setSelectedFiles([]);
      setUploadingFiles(new Set());
    } catch (error) {
      console.error("Error sending via SignalR:", error);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.status === "Sending" ? { ...msg, status: "Failed" } : msg
        )
      );
      setLoadingMedia((prev) => {
        const newSet = new Set(prev);
        newSet.delete(messages.length);
        return newSet;
      });
    }

    setIsUploading(false);
  };

  const handlePayment = () => {
    mutate({
      payload: {
        proceedingId: swappingProceeding?.id as string,
        isChargeFee: !isSwapper,
        roomName: roomName,
      },
    });
  };

  const handleConfirmSwap = () => {
    mutateSwitchSwapStatus({
      payload: {
        status: "AdvNegotiationSwapped",
        swapId: swappingProceeding?.id as string,
      },
    });
  };

  return (
    <section className="border border-[#EEEEEE] border-t-0 h-full flex flex-col flex-1">
      <div
        className={`border-b py-4 px-5 flex justify-between bg-white items-center flex-shrink-0`}
      >
        <div className="flex flex-col items-start md:flex-row md:items-center gap-3 w-full">
          <div className="flex items-center gap-2">
            {isMobile && <ArrowLeft onClick={() => setIsShowChat(false)} />}
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#F4CE9B] rounded-full">
              <Image
                src={profileImageSrc}
                height={40}
                width={40}
                alt="User profile"
                className="w-10 h-10 rounded-full"
                onError={createImageErrorHandler(setImageError)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center">
                <h5 className={`text-[#222222] text-lg font-medium`}>{userName}</h5>
                {connectionStatus && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        connectionStatus === "Connected"
                          ? "bg-green-500"
                          : connectionStatus === "Connecting"
                            ? "bg-yellow-500"
                            : connectionStatus === "Reconnecting"
                              ? "bg-yellow-500"
                              : connectionStatus === "Error"
                                ? "bg-red-500"
                                : "bg-gray-400"
                      }`}
                    />
                    <span className="text-xs text-gray-500">{connectionStatus}</span>
                  </div>
                )}
              </div>
              {swappingProceeding?.status && (
                <p className="text-xs bg-green-800 w-fit px-1 py-1 rounded-md text-white">
                  {SwapStatus[swappingProceeding?.status as keyof typeof SwapStatus]}
                </p>
              )}
            </div>
          </div>
          <div className="me-auto">
            {/* <h5 className={`text-[#222222] text-lg font-medium`}>{userName}</h5> */}
            {/* <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "Connected"
                    ? "bg-green-500"
                    : connectionStatus === "Connecting"
                    ? "bg-yellow-500"
                    : connectionStatus === "Reconnecting"
                    ? "bg-yellow-500"
                    : connectionStatus === "Error"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              ></div>
              <span className="text-xs text-gray-500">{connectionStatus}</span>
            </div> */}
          </div>
          <div className="flex gap-2">
            {/* {swappingProceeding !== null &&
              Object.keys(swappingProceeding || {}).length > 0 &&
              swappingProceeding?.status?.toLowerCase() === "negotiation" &&
              isSwapper === false && (
                <Button
                  className="!h-9 rounded-xl font-medium"
                  onClick={() => setModalType("swap")}
                >
                  Update Swap
                </Button>
              )} */}

            {swappingProceeding !== null &&
              Object.keys(swappingProceeding || {}).length > 0 &&
              !isSwapper &&
              ["Negotiation"].includes(swappingProceeding?.status as string) && (
                <Button
                  className="!h-9 rounded-xl font-medium"
                  onClick={handlePayment}
                  loading={isPending}
                >
                  Make Payment
                </Button>
              )}
            {swappingProceeding !== null &&
              Object.keys(swappingProceeding || {}).length > 0 &&
              isSwapper &&
              ["AwaitingVendorHoldingFee"].includes(swappingProceeding?.status as string) && (
                <Button
                  className="!h-9 rounded-xl font-medium"
                  onClick={handlePayment}
                  loading={isPending}
                >
                  Make Payment
                </Button>
              )}
            {swappingProceeding !== null &&
              Object.keys(swappingProceeding || {}).length > 0 &&
              !isSwapper &&
              ["AdvNegotiation"].includes(swappingProceeding?.status as string) && (
                <Button
                  className="!h-9 rounded-xl font-medium"
                  onClick={handleConfirmSwap}
                  loading={isPendingSwitchSwap}
                >
                  Complete Swap
                </Button>
              )}
            {/* {swappingProceeding !== null &&
              Object.keys(swappingProceeding || {}).length > 0 &&
              !isSwapper &&
              swappingProceeding?.status?.toLowerCase() === "negotiation" && (
                <Button
                  className="!h-9 rounded-xl font-medium "
                  onClick={() => setModalType("closeSwap")}
                  variant={"outline"}
                >
                  Close Swap
                </Button>
              )} */}
            {connection && connection.state === signalR.HubConnectionState.Disconnected && (
              <Button
                className="!h-9 rounded-xl font-medium text-xs"
                onClick={() => {
                  if (connection && connection.state === signalR.HubConnectionState.Disconnected) {
                    connection
                      .start()
                      .then(() => {
                        setConnectionStatus("Connected");
                      })
                      .catch((error) => {
                        setConnectionStatus("Error");
                      });
                  }
                }}
              >
                Retry
              </Button>
            )}
            {/* <Button
              className="!h-9 !w-9 rounded-xl"
              variant="outline"
              onClick={() => setModalType(modalType === "infoDrawer" ? null : "infoDrawer")}
              title="View profile and shared media"
            >
              <Info size={18} />
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="!h-9 !w-9 rounded-xl"
                  variant="outline"
                  // onClick={() => setModalType(modalType === "infoDrawer" ? null : "infoDrawer")}
                  title="View profile and shared media"
                >
                  <EllipsisVertical cursor={"pointer"} />
                </Button>
                {/* <button className="flex items-center !border-0 gap-2">
                  <div className="w-[42px] h-[42px] border rounded-md  flex items-center justify-center">
                    <EllipsisVertical cursor={"pointer"} />
                  </div>
                </button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <div
                      className="cursor-pointer"
                      // variant="outline"
                      onClick={() => setModalType(modalType === "infoDrawer" ? null : "infoDrawer")}
                      title="View profile and shared media"
                    >
                      View
                    </div>
                    {/* <Link href="/settings">View</Link> */}
                  </DropdownMenuItem>
                  {swappingProceeding !== null &&
                    Object.keys(swappingProceeding || {}).length > 0 &&
                    !isSwapper &&
                    ["Negotiation"].includes(swappingProceeding?.status as string) && (
                      <>
                        <DropdownMenuItem>
                          <div onClick={handlePayment} className="cursor-pointer">
                            Make Payment
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div
                            className="text-red-700 cursor-pointer"
                            onClick={() => setModalType("closeSwap")}
                          >
                            Close Swap
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}
                  {swappingProceeding !== null &&
                    Object.keys(swappingProceeding || {}).length > 0 &&
                    isSwapper &&
                    ["AwaitingVendorHoldingFee"].includes(swappingProceeding?.status as string) && (
                      <DropdownMenuItem>
                        <div onClick={handlePayment} className="cursor-pointer">
                          Make Payment
                        </div>
                      </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {chatList.length === 0 ? (
          <EmptyMessageRoom hideMarketplaceLink={true} />
        ) : (
          <div className="p-4">
            {chatList.map((chat, index) => {
              // Check if next message is from the same sender (for avatar)
              const nextMessage = index < chatList.length - 1 ? chatList[index + 1] : null;
              const isNextSameSender = nextMessage && nextMessage.senderId === chat.senderId;
              const showAvatar = !isNextSameSender; // Show avatar when next message is different or this is last message

              // Check if we need to show date separator
              const prevMessage = index > 0 ? chatList[index - 1] : null;
              const showDateSeparator =
                index === 0 || (prevMessage && isDifferentDay(prevMessage.dateTime, chat.dateTime));

              // Check if previous message is from same sender (for spacing)
              const isPrevSameSender = prevMessage && prevMessage.senderId === chat.senderId;

              return (
                <div key={index} className={isPrevSameSender ? "mt-1" : "mt-3"}>
                  {/* Date separator */}
                  {showDateSeparator && (
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-md">
                        {formatDateSeparator(chat.dateTime)}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div className={`flex gap-3 items-end ${chat.isMe ? "flex-row-reverse" : ""}`}>
                    {/* Avatar - only render when showing */}
                    {showAvatar && (
                      <div className="w-8 h-8 rounded-full flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {chat.senderImgUrl ? (
                            <Image
                              src={chat.senderImgUrl}
                              height={32}
                              width={32}
                              alt="Sender"
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <span className="text-xs font-medium">
                              {chat.isMe ? "Me" : userName.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex-1 ${chat.isMe ? "flex justify-end" : "flex justify-start"} ${
                        !showAvatar ? (chat.isMe ? "mr-11" : "ml-11") : ""
                      }`}
                    >
                      {/* Message bubble with timestamp */}
                      <div
                        className={`${
                          chat.isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        } rounded-lg overflow-hidden max-w-md relative`}
                      >
                        {/* Sending/Loading spinner overlay */}
                        {(chat.status === "Sending" || loadingMedia.has(index)) && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-xs text-white font-medium">
                                {chat.status === "Sending" ? "Sending..." : "Loading..."}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Message content based on type */}
                        {chat.messageType === "Image" ? (
                          <div className="relative" style={{ width: "350px", maxWidth: "100%" }}>
                            <img
                              src={chat.message}
                              alt="Shared image"
                              className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                              style={{ height: "220px", objectFit: "cover" }}
                              onClick={() => {
                                setSelectedImageUrl(chat.message);
                                setModalType("viewImage");
                              }}
                              onLoad={() => {
                                // Remove from loading state when image loads
                                setLoadingMedia((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.delete(index);
                                  return newSet;
                                });
                              }}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='14'%3EImage failed to load%3C/text%3E%3C/svg%3E";
                                // Remove from loading state on error
                                setLoadingMedia((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.delete(index);
                                  return newSet;
                                });
                              }}
                            />
                            <div
                              className={`${
                                chat.isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                              } px-3 py-2 flex items-center justify-end gap-2`}
                            >
                              <div className="flex items-center gap-1 text-xs opacity-70 whitespace-nowrap">
                                <span>{formatTime(chat.dateTime || new Date().toISOString())}</span>
                                <MessageStatusIndicator status={chat.status} />
                              </div>
                            </div>
                          </div>
                        ) : chat.messageType === "Video" ? (
                          <div className="relative" style={{ width: "350px", maxWidth: "100%" }}>
                            {/* Video Icon Badge */}
                            <div className="absolute top-2 left-2 z-30 bg-black bg-opacity-70 rounded px-2 py-1 flex items-center gap-1">
                              <FileVideo size={14} className="text-white" />
                              <span className="text-white text-xs font-medium">Video</span>
                            </div>

                            <div
                              className="relative w-full rounded-xl overflow-hidden"
                              style={{ height: "220px" }}
                            >
                              <ReactPlayer
                                src={chat.message}
                                width="100%"
                                height="100%"
                                controls={true}
                                className="rounded-xl"
                                onReady={() => {
                                  setLoadingMedia((prev) => {
                                    const newSet = new Set(prev);
                                    newSet.delete(index);
                                    return newSet;
                                  });
                                }}
                                onError={(error: any) => {
                                  console.error("Video error:", error, chat.message);
                                  setLoadingMedia((prev) => {
                                    const newSet = new Set(prev);
                                    newSet.delete(index);
                                    return newSet;
                                  });
                                }}
                              />
                            </div>

                            <div
                              className={`${
                                chat.isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                              } px-3 py-2 flex items-center justify-end gap-2 rounded-b-lg`}
                            >
                              <div className="flex items-center gap-1 text-xs opacity-70 whitespace-nowrap">
                                <span>{formatTime(chat.dateTime || new Date().toISOString())}</span>
                                <MessageStatusIndicator status={chat.status} />
                              </div>
                            </div>
                          </div>
                        ) : chat.messageType === "File" ? (
                          <div className="p-3">
                            <a
                              href={chat.message}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:underline"
                            >
                              <File
                                size={24}
                                className={chat.isMe ? "text-white" : "text-blue-500"}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">Document</p>
                                <p className="text-xs opacity-70">Click to view</p>
                              </div>
                            </a>
                            <div className="flex items-center justify-end gap-1 text-xs opacity-70 whitespace-nowrap mt-2">
                              <span>{formatTime(chat.dateTime || new Date().toISOString())}</span>
                              <MessageStatusIndicator status={chat.status} />
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 inline-flex items-end gap-2">
                            <p className="text-sm flex-1">{chat.message}</p>
                            <div className="flex items-center gap-1 text-xs opacity-70 whitespace-nowrap">
                              <span>{formatTime(chat.dateTime || new Date().toISOString())}</span>
                              <MessageStatusIndicator status={chat.status} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="border-t border-b bg-white shadow-sm p-4 flex-shrink-0 relative z-20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-800">
              {selectedFiles.length} file(s) selected
            </span>
            <button
              onClick={clearAllFiles}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-1.5 rounded-md transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 pt-2 px-1">
            {selectedFiles.map((file, index) => {
              const fileType = getFileType(file);
              const isImage = fileType === "Image";
              const isVideo = fileType === "Video";
              const isUploading = uploadingFiles.has(index);

              return (
                <div
                  key={index}
                  className="relative bg-white border border-gray-200 rounded-lg p-2 min-w-[120px] max-w-[120px] flex-shrink-0"
                >
                  {/* Loading Overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center z-20">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-white font-medium">Uploading...</span>
                      </div>
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md z-30 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={14} />
                  </button>

                  {/* File preview */}
                  <div
                    className={`flex flex-col items-center gap-2 ${isUploading ? "opacity-50" : ""}`}
                  >
                    {isImage ? (
                      <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center">
                        {isVideo ? (
                          <FileVideo size={32} className="text-purple-500" />
                        ) : (
                          <File size={32} className="text-blue-500" />
                        )}
                      </div>
                    )}

                    <div className="w-full text-center">
                      <p className="text-xs text-gray-700 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="border-t p-4 flex-shrink-0 relative">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
          onChange={handleFileSelect}
          className="hidden"
        />

        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className={`absolute left-4 z-50 ${selectedFiles.length > 0 ? "bottom-32" : "bottom-20"}`}
          >
            <EmojiPicker
              onEmojiClick={(emojiData: any) => {
                setMessageInput((prev) => prev + emojiData.emoji);
              }}
            />
          </div>
        )}

        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Smiley className="w-5 h-5" />
          </button>

          <textarea
            placeholder="Type a message..."
            className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] max-h-[120px] overflow-y-auto"
            rows={1}
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
              // Auto-grow textarea
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              // Send on Enter (without Shift)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (messageInput.trim()) {
                  sendMessage(messageInput.trim());
                  setMessageInput("");
                  // Reset textarea height
                  e.currentTarget.style.height = "auto";
                }
              }
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Attach files (images, videos, documents)"
          >
            <Plus className="w-5 h-5" />
          </button>

          <Button
            size="sm"
            disabled={isUploading}
            onClick={async () => {
              if (selectedFiles.length > 0) {
                await handleSendWithFiles();
              } else if (messageInput.trim()) {
                sendMessage(messageInput.trim());
                setMessageInput("");
              }
            }}
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={16} />
            )}
          </Button>
        </div>
      </div>

      {/* Consolidated Dialog */}
      <Dialog open={modalType !== null} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent
          className={
            modalType === "viewImage"
              ? "max-w-[90vw] max-h-[90vh] p-0 bg-black border-none"
              : modalType === "infoDrawer"
                ? "!fixed !right-0 !top-0 !bottom-0 !left-auto !w-[400px] h-screen max-w-[90vw] !translate-x-0 !translate-y-0 m-0 p-0 border-none shadow-2xl !grid-none"
                : "max-w-md"
          }
        >
          {useMemo(() => {
            switch (modalType) {
              case "swap":
                return (
                  <SwapModalContent
                    swapType={swapType}
                    setSwapType={setSwapType}
                    handleClose={() => setModalType(null)}
                  />
                );

              case "closeSwap":
                return (
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="text-[#222222] text-xl font-medium">
                        Close Swap
                      </DialogTitle>
                      <DialogDescription className="text-[#737373] text-sm mt-2">
                        Are you sure you want to close this swap? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setModalType(null)}
                        disabled={isClosingSwap}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#E42222] hover:bg-[#CC1E1E] text-white"
                        onClick={() => {
                          if (swapId) {
                            closeSwap(swapId);
                          }
                        }}
                        disabled={isClosingSwap || !swapId}
                        loading={isClosingSwap}
                      >
                        Close Swap
                      </Button>
                    </DialogFooter>
                  </div>
                );

              case "viewImage":
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <button
                      onClick={() => setModalType(null)}
                      className="absolute top-4 right-4 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
                    >
                      <X size={24} />
                    </button>
                    <img
                      src={selectedImageUrl}
                      alt="Full view"
                      className="max-w-full max-h-[85vh] object-contain"
                    />
                  </div>
                );

              case "infoDrawer":
                return (
                  <div className="w-full h-full bg-white overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                      <h3 className="text-lg font-semibold text-gray-800">Profile & Media</h3>
                      <button
                        onClick={() => setModalType(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="p-6 border-b">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-[#F4CE9B] flex items-center justify-center mb-3">
                          <Image
                            src={profileImageSrc}
                            height={96}
                            width={96}
                            alt="User profile"
                            className="w-24 h-24 rounded-full"
                            onError={createImageErrorHandler(setImageError)}
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">{userName}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              connectionStatus === "Connected" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-sm text-gray-500">{connectionStatus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Media Stats */}
                    <div className="p-6 border-b">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Shared Files</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <FileImage size={24} className="mx-auto text-blue-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{mediaStats.images}</p>
                          <p className="text-xs text-gray-600">Photos</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <FileVideo size={24} className="mx-auto text-purple-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{mediaStats.videos}</p>
                          <p className="text-xs text-gray-600">Videos</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <File size={24} className="mx-auto text-green-500 mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{mediaStats.files}</p>
                          <p className="text-xs text-gray-600">Files</p>
                        </div>
                      </div>
                    </div>
                    {swappingProceeding != null &&
                      swappingProceeding !== null &&
                      Object.keys(swappingProceeding || {}).length > 0 &&
                      swappingProceeding?.isSwapper === false &&
                      swappingProceeding?.status?.toLowerCase() !== "closed" && (
                        <div className="px-5">
                          <Button
                            className="!h-9 rounded-xl font-medium w-full my-10"
                            onClick={() => setModalType("closeSwap")}
                          >
                            Close Swap
                          </Button>
                        </div>
                      )}
                    {/* Shared Media Grid */}
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Recent Media</h4>
                      {allMedia.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {allMedia.slice(0, 12).map((media, idx) => (
                            <div
                              key={idx}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {
                                if (media.messageType === "Image") {
                                  setSelectedImageUrl(media.message);
                                  setModalType("viewImage");
                                } else {
                                  window.open(media.message, "_blank");
                                }
                              }}
                            >
                              {media.messageType === "Image" ? (
                                <img
                                  src={media.message}
                                  alt="Shared media"
                                  className="w-full h-full object-cover"
                                />
                              ) : media.messageType === "Video" ? (
                                <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                  <FileVideo size={32} className="text-purple-500" />
                                </div>
                              ) : (
                                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                  <File size={32} className="text-blue-500" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-8">
                          No media shared yet
                        </p>
                      )}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          }, [
            modalType,
            swapType,
            selectedImageUrl,
            isClosingSwap,
            swapId,
            closeSwap,
            profileImageSrc,
            userName,
            connectionStatus,
            imageError,
            mediaStats,
            allMedia,
            swappingProceeding,
          ])}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MessageRoom;
