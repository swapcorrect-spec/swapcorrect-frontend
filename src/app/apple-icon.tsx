import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#007AFF",
          borderRadius: "40px",
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1 7.4H5.9M5.9 7.4L8.4 5.1M5.9 7.4L8.4 9.7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.9 12.6H14.1M14.1 12.6L11.6 10.3M14.1 12.6L11.6 14.9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.1 3.4C6.4 2.65 7.9 2.2 9.5 2.2C13.53 2.2 16.8 5.47 16.8 9.5C16.8 13.53 13.53 16.8 9.5 16.8C5.47 16.8 2.2 13.53 2.2 9.5C2.2 7.9 2.65 6.4 3.4 5.1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
