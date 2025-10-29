"use client";

import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function PrimaryButton({
  label,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-4 bg-gray-300 text-black font-extrabold py-2 px-6 hover:bg-gray-400 transition-all duration-300 rounded-sm"
    >
      {label}
    </button>
  );
}
