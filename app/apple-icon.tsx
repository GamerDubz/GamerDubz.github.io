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
          <path
            d="M9 8v11a6 6 0 0 0 12 0V8"
            stroke="#12141a"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <path d="M17 25 25 8" stroke="#0e6655" strokeWidth={2.4} strokeLinecap="round" />
        </svg>
      </div>
    ),
    size
  );
}
