import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-md font-medium transition
        ${variant === "default" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
        ${variant === "outline" ? "border border-gray-400 text-gray-700 hover:bg-gray-100" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
