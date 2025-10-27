import React from "react";

interface TitleProps {
  firstLine: string;
  secondLine?: string;
  align?: "left" | "center" | "right";
}

export default function Title({
  firstLine,
  secondLine,
  align = "right",
}: TitleProps) {
  return (
    <h1
      className={`font-bebas text-white text-[120px] leading-[100px] text-${align} tracking-[2px]`}
      style={{
        lineHeight: "1.1",
        letterSpacing: "0.05em",
      }}
    >
      {firstLine}
      {secondLine && (
        <>
          <br />
          <span className="block">{secondLine}</span>
        </>
      )}
    </h1>
  );
}
