import { Controls } from "@/app/_components/controls";
import { MobileHeader } from "@/components/mobile-header";
// import { Modification } from "@/components/modification";
import { Sidebar } from "@/components/sidebar";


type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <MobileHeader />
      <Sidebar className="hidden xl:flex" />
      <main className="xl:pl-[256px] flex gap-x-3 h-full pt-[30px] xl:pt-0 relative bg-[#242424]">
        {/* children + controls in a flex row */}
        <div className="flex lg:max-w-[950px] w-full mx-auto">
          {/* main content */}
          <div className=" w-full pt-6 lg:mx-auto h-full">
            {children}
          </div>
          {/* controls stick to right of children */}
          <div className="pt-[24px] ml-6 hidden lg:block lg:mr-auto">
            <Controls className="flex flex-col items-center py-2"/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
