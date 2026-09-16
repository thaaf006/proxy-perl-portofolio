"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <Button variant="ghost" className="icon-button" aria-label="Toggle light or dark theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Moon className="dark:hidden" size={18} /><Sun className="hidden dark:block" size={18} /></Button>;
}
