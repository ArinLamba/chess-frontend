"use client";
import { BrushCleaning } from "lucide-react";
import { ActionTooltip } from "../../components/action-tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/store/use-theme";

import type { Theme } from "@/lib/constants";
import { cn } from "@/lib/utils";


export const SelectPieceTheme = () => {
  const { setTheme, theme } = useTheme();

  const themes = [
    { key: "neo", label: "Neo" },
    { key: "standard", label: "Standard" },
    { key: "classic", label: "Classic" },
  ];

  return (
    <DropdownMenu>
      <div className=" w-full flex items-center ">
        <ActionTooltip label="Theme">
          <DropdownMenuTrigger 
            className="focus:outline-none text-muted-foreground hover:text-neutral-300 transition-colors cursor-pointer"
            asChild
            >
            <BrushCleaning size={20} />
          </DropdownMenuTrigger>
        </ActionTooltip>
      </div>

      <DropdownMenuContent
        
        align="center"
        className="  w-40 text-xs font-medium bg-neutral-900 border border-white/10 "
      >
        {themes.map(({ key, label }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as Theme)}
            className={cn(
              "text-white px-3 py-2 text-sm cursor-pointer hover:bg-neutral-800",
              theme === key
                ? "text-indigo-400"
                : "text-neutral-300"
            )}
          >
            <span className="text-sm">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

    