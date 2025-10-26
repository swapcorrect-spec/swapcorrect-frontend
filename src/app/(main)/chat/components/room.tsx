import EmptyMessageRoom from "./empty-room";
import Image from "next/image";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import MomentAgo from "@/components/moment-ago";
import { Input } from "@/components/ui/input";
import SwapModalContent from "./swap-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Gallery from "@/app/assets/images/svgs/Gallery.svg";
import Smiley from "@/app/assets/images/svgs/smiley.svg";
import { useGetChatRoomMessages } from "@/app/_hooks/queries/chat/chat";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { useSearchParams } from "next/navigation";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import * as signalR from "@microsoft/signalr";

type ChatListProps = {
  id: string;
  message: string;
  time: string;
  isText: boolean;
  fileUrl?: {
    imgUrl: string;
  }[];
};

interface MessageRoomProps {
  userName: string;
  userProfileUrl: string;
  userId: string; // Add userId from selected chat
}

const MessageRoom: React.FC<MessageRoomProps> = ({ userName, userProfileUrl, userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [swapType, setSwapType] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<ChatListProps[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  
  const searchParams = useSearchParams();
  const roomName = searchParams.get('roomName') || '';
  
  const { data: currentUserData } = useGetUserInfo({
    enabler: true,
  });
  
  const currentUserId = currentUserData?.result?.id || '';
  
  const { data, isLoading, isError, error } = useGetChatRoomMessages({
    roomName,
    enabler: !!roomName,
  });
  
  // Sync GET request data with messages state
  useEffect(() => {
    if (data?.result && Array.isArray(data.result)) {
      setMessages(data.result);
    }
  }, [data]);
  
  const profileImageSrc = getImageSrcWithFallback(userProfileUrl, imageError);
  
  // Use messages state instead of hardcoded chatList
  const chatList = messages;

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

  // Handle SignalR connection and room management
  useEffect(() => {
    if (
      !connection ||
      connection.state !== signalR.HubConnectionState.Disconnected ||
      !roomName ||
      !currentUserId
    )
      return;

    const startSignalR = async () => {
      try {
        setConnectionStatus("Connecting");
        
        await connection.start();
        setConnectionStatus("Connected");

        // Join the room
        await connection.invoke("JoinRoom", roomName, currentUserId);

        // Register handler once
        connection.off("ReceiveMessage"); // Prevent duplicate handlers
        connection.on("ReceiveMessage", (message) => {
          console.log("Received message data:", message);
          console.log("Message type:", typeof message);
          console.log("Message structure:", JSON.stringify(message, null, 2));
          
          // Handle edge case where backend sends string instead of object
          if (typeof message === "string") {
            console.warn("Received string instead of message object, ignoring:", message);
            return;
          }
          
          // Transform message to match expected format
          const transformedMessage = {
            id: message.id || message.userId || "unknown",
            message: message.message || message.content || "",
            time: message.time || message.timestamp || new Date().toISOString(),
            isText: message.isText !== undefined ? message.isText : true,
            fileUrl: message.fileUrl || undefined
          };
          
          console.log("Transformed message:", transformedMessage);
          setMessages(prev => [...prev, transformedMessage]);
        });

      } catch (error) {
        setConnectionStatus("Error");
      }
    };

    startSignalR();
  }, [connection, roomName, currentUserId]);

  // Send message function
  const sendMessage = async (message: string, messageType: string = "Text") => {
    if (connection && roomName && currentUserId) {
      try {
        console.log("Sending message:", {
          roomName,
          userId: currentUserId,
          message,
          messageType
        });
        await connection.invoke("SendMessageToRoom", roomName, currentUserId, message, messageType);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="border border-[#EEEEEE] border-t-0">
      <div
        className={`border-b py-4 px-5 flex justify-between sticky bg-white top-0 z-10 items-center`}
      >
        <div className="flex items-center gap-3 w-full">
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
          <div className="me-auto">
            <h5 className={`text-[#222222] text-lg font-medium`}>
              {userName}
            </h5>
            <div className="flex items-center gap-2">
              <div 
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === "Connected" ? "bg-green-500" :
                  connectionStatus === "Connecting" ? "bg-yellow-500" :
                  connectionStatus === "Reconnecting" ? "bg-yellow-500" :
                  connectionStatus === "Error" ? "bg-red-500" :
                  "bg-gray-400"
                }`}
              ></div>
              <span className="text-xs text-gray-500">
                {connectionStatus}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="!h-9 rounded-xl font-medium"
              onClick={() => setIsOpen(!isOpen)}
            >
              Swap
            </Button>
            <Button
              className="!h-9 rounded-xl font-medium text-xs"
              onClick={() => {
                // Try to manually start connection
                if (connection && connection.state === signalR.HubConnectionState.Disconnected) {
                  connection.start()
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
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
        {chatList.length === 0 ? (
          <EmptyMessageRoom  hideMarketplaceLink={true}/>
        ) : (
          <div className="p-4 space-y-4">
            {chatList.map((chat, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {chat.id === "1" ? "Me" : userName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {chat.id === "1" ? "You" : userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      <MomentAgo createdAt={chat.time || new Date().toISOString()} />
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            startIcon={<Smiley />}
            endIcon={<Gallery />}
            placeholder="Type a message..."
            className="flex-1"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && messageInput.trim()) {
                sendMessage(messageInput.trim());
                setMessageInput("");
              }
            }}
          />
          <Button 
            size="sm"
            onClick={() => {
              if (messageInput.trim()) {
                sendMessage(messageInput.trim());
                setMessageInput("");
              }
            }}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <SwapModalContent
            swapType={swapType}
            setSwapType={setSwapType}
            handleClose={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MessageRoom;