"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES = [
  { value: "dark",   label: "Night Vision",    Icon: Moon    },
  { value: "light",  label: "High Visibility", Icon: Sun     },
  { value: "system", label: "Auto Detect",     Icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render a stable placeholder during SSR to prevent hydration mismatch.
  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Theme" disabled className="opacity-0" />;
  }

  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0];
  const Icon = current.Icon;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
      title={current.label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
