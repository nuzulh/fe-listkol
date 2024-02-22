import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string; }) {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        className,
      )}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center gap-2 bg-dots">
      <Spinner /> Loading...
    </div>
  );
}
