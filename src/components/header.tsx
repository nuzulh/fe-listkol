import { Stars } from "lucide-react";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setIsScrolled(true) : setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header
      data-aos="fade-down"
      className={cn(
        "w-full py-2 md:py-0 px-10 flex items-center justify-between fixed top-0 z-30",
        isScrolled && "bg-white shadow",
      )}
    >
      <div data-aos="zoom-in" className="flex gap-2 font-bold">
        <Stars /> Logo
      </div>
      <Navbar />
    </header>
  );
}
