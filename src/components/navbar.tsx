import { AlignRight, LogIn, StarsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menus } from "@/lib/consts";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (link: string) => {
    const { pathname, hash } = location;

    if (pathname === "/" && link.includes(hash))
      return true;

    return false;
  };

  return (
    <>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <AlignRight />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="items-start flex-row gap-2 font-bold">
              <StarsIcon /> Logo
            </SheetHeader>
            <nav className="my-4 w-full">
              {menus.map((menu) => (
                <Button
                  key={menu.link}
                  variant="ghost"
                  className={cn(
                    "w-full opacity-70",
                    isActive(menu.link) && "opacity-100 font-bold",
                  )}
                  onClick={() => setOpen(false)}
                  asChild
                >
                  <a href={menu.link} className="border-b">
                    {menu.title}
                  </a>
                </Button>
              ))}
            </nav>
            <SheetFooter className="mt-12">
              <Button variant="shadow" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex">
        <nav className="my-4 w-full flex items-center">
          {menus.map((menu) => (
            <Button
              key={menu.link}
              variant="ghost"
              className={cn(
                "w-full opacity-70",
                isActive(menu.link) && "opacity-100 font-bold",
              )}
              onClick={() => setOpen(false)}
              asChild
            >
              <a href={menu.link}>
                {menu.title}
              </a>
            </Button>
          ))}
        </nav>
      </div>
      <Button
        variant="shadow"
        size="sm"
        className="hidden md:inline-flex"
        asChild
      >
        <Link to="/login">
          <LogIn className="h-4 w-4 mr-2" /> Login
        </Link>
      </Button>
    </>
  );
}
