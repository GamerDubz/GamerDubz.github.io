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
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: "5px solid #12141a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            fontFamily: "Georgia, serif",
            color: "#12141a",
          }}
        >
          UD
        </div>
      </div>
    ),
    size
  );
}
