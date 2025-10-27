import React from "react";

interface SubtitleProps {
  firstLine: string;
  secondLine?: string;
  align?: "left" | "center" | "right";
}

export default function Subtitle({
  firstLine,
  secondLine,
  align = "center",
}: SubtitleProps) {
  return (
    <p
      className={`font-roboto text-gray-200 text-${align} text-[28px] font-light mt-6`}
      style={{
        lineHeight: "1.4",
      }}
    >
      {firstLine}
      {secondLine && (
        <>
          <br />
          <span>{secondLine}</span>
        </>
      )}
    </p>
  );
}
