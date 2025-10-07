
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  label: string;
  children: React.ReactNode;
};

export function ActionTooltip({ label, children } : Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-neutral-800  text-neutral-100" side="right" align="center">
          <p className="text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
