
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";


type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <MobileHeader />
      <Sidebar className="hidden xl:flex" />
      <main className="xl:pl-[256px] flex gap-x-3 pt-[30px] xl:pt-0 relative">
        {/* children + controls in a flex row */}
        <div className="flex lg:max-w-[950px] w-full mx-auto">
          {/* main content */}
          <div className="mx-auto pt-6 lg:mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
