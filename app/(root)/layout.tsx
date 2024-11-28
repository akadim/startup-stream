import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
};

export default Layout;
