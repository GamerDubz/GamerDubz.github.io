import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

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
          background: "#f1f2f4",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <rect x="1.5" y="1.5" width="29" height="29" rx="7.5" stroke="#12141a" strokeWidth={1.4} />
          <path
            d="M10 10v7a6 6 0 0 0 6 6h1a5 5 0 0 0 5-5v-1a5 5 0 0 0-5-5h-3"
            stroke="#12141a"
            strokeWidth={2.2}
            strokeLinecap="round"
          />
          <circle cx="22" cy="17" r="1.6" fill="#0e6655" />
        </svg>
      </div>
    ),
    size
  );
}
