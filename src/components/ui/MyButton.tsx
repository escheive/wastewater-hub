import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "moss" | "sage" | "creamOutline" | "clayAccent"
  size?: "sm" | "md" | "lg"
}

const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

const variants = {
  default: "!bg-blue-600 !text-white hover:!bg-blue-700 focus:!ring-blue-500",
  moss: "!bg-[#5F6F52] !text-[#FEFAE0] hover:!bg-[#4d5d41] hover:!outline-[#FEFAE0] hover:!outline-2 focus:!ring-[#5F6F52]",
  sage: "!bg-[#A9B388] !text-[#5F6F52] hover:!bg-[#98a37a] focus:!ring-[#A9B388]",
  creamOutline: "!bg-transparent !border !border-[#FEFAE0] !text-[#5F6F52] hover:!bg-[#FEFAE0] hover:!text-[#5F6F52] focus:!ring-[#FEFAE0]",
  clayAccent: "!bg-[#B99470] !text-white hover:!bg-[#a4795c] focus:!ring-[#B99470]",
}

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
}

export const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

MyButton.displayName = "MyButton"