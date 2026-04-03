import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export const CircularProgress: React.FC<Props> = ({
  size = 20,
  color = "white",
  className,
}) => {
  return (
    <svg
      className={cn("animate-spin duration-500", className)}
      fill="none"
      height={size}
      viewBox={`0 0 ${20} ${20}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z"
        fill={color}
      />
    </svg>
  );
};

type CircularBarProps = {
  size?: number;
  strokeWidth?: number;
  progress: number;
  children?: React.ReactNode;
  trackColor?: string;
  progressColor?: string;
};

export const CircularProgressBar = ({
  size = 60,
  strokeWidth = 8,
  progress,
  children,
  trackColor = "stroke-gray-200",
  progressColor = "stroke-[#FF6600]",
}: CircularBarProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />

        <circle
          className={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.35s",
          }}
        />
      </svg>
      <div className="absolute text-center text-base font-medium">
        {children}
      </div>
    </div>
  );
};
