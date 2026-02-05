import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-blue-400 focus-visible:ring-blue-100 focus-visible:ring-4 focus-visible:shadow-md",
        "hover:border-blue-300 hover:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };