import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function PricingSwitch({
  labelA,
  labelB,
  value,
}: {
  labelA: string;
  labelB: string;
  value: (x: "A" | "B") => void;
}) {
  const [openedState, setOpenedState] = useState<"A" | "B">("A");

  useEffect(() => {
    value(openedState);
  }, [openedState, value]);

  return (
    <div
      className="rounded-full shadow-solid bg-white text-black flex items-center justify-between w-fit gap-2 px-3 py-2 text-sm"
    >
      <button
        className={cn(
          "cursor-pointer py-1 px-2 rounded-full",
          openedState === "A" && "bg-primary text-white"
        )}
        onClick={() => setOpenedState("A")}
      >
        {labelA}
      </button>
      <button
        className={cn(
          "cursor-pointer py-1 px-2 rounded-full",
          openedState === "B" && "bg-primary text-white"
        )}
        onClick={() => setOpenedState("B")}
      >
        {labelB}
      </button>
    </div>
  );
}
