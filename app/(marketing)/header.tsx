import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Header = () => {
  const buttonContent = (
    <Button size="lg" variant="ghost">
      Login
    </Button>
  );
  return (
    <header className="h-20 w-full border-b border-white/20 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-2">
          <Image src="logo.svg" height={40} width={40} alt="Chess" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Chess
          </h1>
        </div>
        {buttonContent}
      </div>
    </header>
  );
};
