"use client";

import { Dispatch, SetStateAction } from "react";
import { Card } from "./card";
import ButtonSvgGlow from "../svgIcon/ButtonSvgGlow";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type TCustomTabButtonProps = {
  buttons: string[];
  current: string;
  setCurrent: Dispatch<SetStateAction<string>>;
  className?: string;
  icon?: LucideIcon[];
  isFullWidth?: boolean;
};

const CustomTabButton = ({
  buttons,
  current,
  setCurrent,
  className,
  icon,
  isFullWidth = false,
}: TCustomTabButtonProps) => {
  return (
    <Card
      className={cn(
        "px-3 rounded-2xl flex flex-row items-center justify-between gap-4 sm:gap-6 py-1.5 effect overflow-x-auto no-scrollbar w-full",
        className,
      )}
    >
      {buttons.map((item, i) => {
        const active = item === current;
        return (
          <button
            key={i}
            onClick={() => setCurrent(item)}
            className={`relative py-2 flex shrink-0 items-center gap-1 justify-center cursor-pointer ${isFullWidth ? "flex-1 min-w-max" : ""} ${
              active ? "rounded-xl effect-no-bg px-2 sm:px-4" : "px-2 sm:px-4"
            }`}
          >
            {icon?.length && icon.map((Icon, i) => <Icon key={i} size={16} />)}
            <span className="relative z-10 text-xs sm:text-sm whitespace-nowrap">{item}</span>
            {active && (
              <div className="absolute z-20 bottom-0 left-0 w-full">
                <span
                  className="block w-full h-[1.5px]"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,177,63,0) 0%, #FFB13F 50%, rgba(255,177,63,0) 100%)",
                  }}
                />
              </div>
            )}
            {active && <ButtonSvgGlow />}
          </button>
        );
      })}
    </Card>
  );
};

export default CustomTabButton;
