"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { LucideIcon } from "lucide-react";

type TTooltipComponentProps = {
  name: string;
  trimedName?: string;
  classname?: string;
  contentClassName?: string;
  icon?: LucideIcon;
};

const TooltipComponent = ({
  name,
  trimedName,
  classname,
  contentClassName,
  icon: Icon,
}: TTooltipComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {Icon ? (
            <span className="p-1 rounded-full hover:bg-green-500 block duration-500">
              <Icon size={18} className="text-green-800" />
            </span>
          ) : (
            <span className={cn("cursor-pointer ", classname)}>
              {trimedName}
            </span>
          )}
        </TooltipTrigger>

        <TooltipContent
          side="top"
          align="center"
          className={cn("max-w-xs text-center wrap-break-word", contentClassName)}
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
