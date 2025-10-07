import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[250px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="logo.svg" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-b from-blue-200 to-blue-300 bg-clip-text text-transparent max-w-[480px] text-center">
          &quot;Some games you&apos;re the artist, Some games you&apos;re the canvas&quot;
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <Button variant="secondary" asChild className="w-full uppercase">
            <Link href={"/play"}  className="w-full">
              Continue Playing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
