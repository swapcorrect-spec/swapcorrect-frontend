"use client";

export default function EmptyChatRoom() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h4 className={`text-lg  font-avenir-semibold mt-4 mb-1`}>
        No conversation yet
      </h4>
      <p className={`text-sm max-w-[288px] mb-4 w-full text-center `}>
        It’s lonely here...
      </p>
    </div>
  );
}
