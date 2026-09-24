"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
}

export function NavBar({
  items,
  activeIndex,
  onActiveIndexChange,
  className,
}: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.name ?? "");
  const [isMobile, setIsMobile] = useState(false);
  const controlledName = activeIndex === undefined ? undefined : items[activeIndex]?.name;
  const currentActiveTab = controlledName ?? internalActiveTab;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 mb-6 -translate-x-1/2 sm:top-0 sm:bottom-auto sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/75 p-1 shadow-lg backdrop-blur-lg sm:gap-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentActiveTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => {
                setInternalActiveTab(item.name);
                onActiveIndexChange?.(index);
              }}
              className={cn(
                "relative cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                "text-foreground/70 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden" aria-label={item.name}>
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight-lamp"
                  className="pointer-events-none absolute inset-0 -z-10 w-full rounded-full bg-primary/5"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
                    {!isMobile && (
                      <>
                        <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
                        <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
                        <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
