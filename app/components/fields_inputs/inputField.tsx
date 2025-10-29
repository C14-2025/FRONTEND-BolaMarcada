"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
}: InputFieldProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-white text-lg font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[45px] rounded-sm p-2 outline-none text-black focus:ring-2 focus:ring-[#EFA23B] transition-all duration-200"
      />
    </div>
  );
}
