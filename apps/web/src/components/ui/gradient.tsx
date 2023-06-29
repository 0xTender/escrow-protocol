import * as React from "react";
import { type FCC, cn } from "@app/utils";
import { type VariantProps, cva } from "class-variance-authority";

export const gradientVariants = cva(
  "flex h-full w-full items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#EBEBEB] to-[#F8F8F8] dark:from-[#313131] dark:to-[#2B2B2B]",
        from: "bg-[#B2E269] text-gray-800",
        to: "bg-[#383B98] text-gray-200",
      },
    },
  }
);

export const Gradient: FCC<
  VariantProps<typeof gradientVariants> & React.HTMLAttributes<HTMLDivElement>
> = ({ children, variant = "default", className, ...props }) => {
  return (
    <div className={cn(gradientVariants({ variant, className, ...props }))}>
      {children}
    </div>
  );
};
