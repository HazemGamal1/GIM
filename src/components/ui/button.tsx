import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        stylized: "bg-[#2d2d2d] text-white border-[#262626] border p-3 rounded-none font-semibold  flex gap-2 items-center",
        material_purple: "text-white bg-gradient-to-t from-[#6d48ff] to-[#8661ff] rounded-md border border-[#6c47ff] hover:to-[#8e6cff] cursor-pointer",
        material_black: "text-[#fafafa] bg-gradient-to-t from-[#212126] to-[#3b3b41] rounded-md border border-[#212126] hover:to-[#535357] cursor-pointer",
        material_blue: "text-[#fafafa] bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-md border border-[#3b82f6] hover:to-[#7fb5fc] cursor-pointer",
        material_red: "text-[#fafafa] bg-gradient-to-t from-[#ef4444] to-[#f87171] rounded-md border border-[#ef4444] hover:to-[#fca5a5] cursor-pointer",
        material_danger_red: "text-[#fafafa] bg-gradient-to-t from-[#dc2626] to-[#ef4444] rounded-md border border-[#dc2626] hover:to-[#fca5a5] cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
