"use client";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import TooltipComponent from "@/components/ui/TooltipComponent";
import Image from "next/image";
import logo from "../../../public/chotur.jpg";

type TeamSwitcherProps = {
  name: string;
  plan: string;
};

export function TeamSwitcher({ name, plan }: TeamSwitcherProps) {
  const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <div
                className="flex aspect-square size-8 sm:size-10 items-center justify-center rounded-lg overflow-hidden p-0.5"
                style={{
                  background:
                    "linear-gradient(to bottom right, #FFFFFF 2%, #FFB13F, #FFCB7F, #d4b012ff)",
                }}
              >
                <Image
                  src={logo}
                  alt="Chotur Logo"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">
                  <TooltipComponent name={name} trimedName={trimedName} />
                </span>
                <span className="truncate text-xs">{plan}</span>
              </div>
            </div>
          </Link>

          <SidebarTrigger />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
