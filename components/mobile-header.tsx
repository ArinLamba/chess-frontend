import { MobileSidebar } from "@/components/mobile-sidebar";
import Image from "next/image";


export const MobileHeader = () => {
  return (
    <nav className="xl:hidden px-6 h-[50px] flex items-center dark:bg-neutral-950 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
      <div className="left-1/2 absolute -translate-x-1/2 flex items-center gap-x-3">
        <Image src="/logo.svg" height={30} width={30} alt="Mascot" />
        <h1 className="text-xl font-extrabold text-green-600 tracking-wide">
          Chess
        </h1>
      </div>
    </nav>
  );
};

