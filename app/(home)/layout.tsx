
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Provider from "@/provider/Provider";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for Next.js
export const metadata: Metadata = {
  title: "Optilux CRM",
  description: "This is the dashboard of Optiluxbd CRM",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <div
        className={`
        ${geistSans.variable} ${geistMono.variable} 
        antialiased 
        relative 
        min-h-screen 
        bg-[linear-gradient(40deg,hsl(0_0%_0%)_2%,hsl(285_65%_8%)_34%,hsl(278_72%_13%)_46%,hsl(278_72%_13%)_57%,hsl(285_65%_8%)_69%,hsl(0_0%_0%)_99%)]
        text-white`}
      >
        {/* Layout Structure */}
        <div className="max-w-360 mx-auto relative text-white z-10">
          <SidebarProvider className="px-1 gap-1" defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="max-w-[1200px] w-full min-w-0 mx-auto space-y-0">
              <div className="w-full mx-auto md:px-1 md:py-4 px-2 py-6 overflow-x-hidden relative z-20">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </Provider>
  );
};

export default layout;
