"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      className="icon-button"
      aria-label="Toggle light or dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="theme-icons" aria-hidden="true">
        <Moon className="theme-moon" size={18} />
        <Sun className="theme-sun" size={18} />
      </span>
    </Button>
  );
}
