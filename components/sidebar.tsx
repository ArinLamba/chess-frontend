import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};


export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn("flex h-full md:w-[256px] md:fixed left-0 top-0 px-4 border-r flex-col bg-[var(--bg)] z-50",
    className,
    )}>
      <Link href="/play">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 ">
          <Image src="/logo.svg" height={40} width={40} alt="Chess" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Chess
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Play Online" 
          href="/play"
          iconSrc="/logo.svg" 
        />
        <SidebarItem 
          label="Play Against Bot" 
          href="/bot"
          iconSrc="/logo.svg" 
        />
      </div>
    </div>
  );
};