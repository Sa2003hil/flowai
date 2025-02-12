"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, RefObject } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs"; // Remove currentUser from here
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import AnimationContainer from "@/components/global/animation-container";
import Icons from "@/components/global/icons";
import Wrapper from "@/components/global/wrapper";
import { NAV_LINKS } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  user: any; // Accept user as a prop
};

const Navbar = ({ user }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const mobileMenuRef = useClickOutside(() => {
    if (open) setOpen(false);
  });

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <header className="fixed w-full top-0 inset-x-0 z-50">
      <motion.div
        animate={{ width: visible ? "40%" : "100%", y: visible ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
        style={{ minWidth: "800px" }}
        className={cn(
          "hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full backdrop-blur",
          visible && "bg-background/60 py-2 border border-t-foreground/20 border-b-foreground/10 border-x-foreground/15 w-full"
        )}
      >
        <Wrapper className="flex items-center justify-between lg:px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="flex items-center gap-2">
              {/* <Icons.logo className="w-max h-6 -mt-1" /> */}
              <Image src="/logo.png" alt="logo" width={100} height={30} />
            </Link>
          </motion.div>

          <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-2 text-sm text-muted-foreground font-medium">
            <AnimatePresence>
              {NAV_LINKS.map((link, index) => (
                <AnimationContainer key={index} animation="fadeDown" delay={0.1 * index}>
                  <div className="relative">
                    <Link href={link.link} className="hover:text-foreground transition-all duration-500 hover:bg-accent rounded-md px-4 py-2">
                      {link.name}
                    </Link>
                  </div>
                </AnimationContainer>
              ))}
            </AnimatePresence>
          </div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button className="rounded-full">Dashboard</Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button className="rounded-full" size="sm">Get started</Button>
                </Link>
              )}
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>
    </header>
  );
};

export default Navbar;
